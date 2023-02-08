import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  deleteDoc,
  where,
  query
} from 'firebase/firestore'
import { Ref } from 'vue'
import { useUser } from './useUser'
const nuxtApp = useNuxtApp()
const user = useUser()

interface TagState {
  id?: string
  name: string
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
}

class Tags {
  private _tags: Ref<TagState[]>
  constructor (_tags: TagState[]) {
    this._tags = useState('tags', () => _tags)
  }

  findAll (): TagState[] {
    return this._tags.value
  }

  async add (newTag: TagState) {
    const tag = {
      name: newTag.name,
      userId: newTag.userId,
      createdAt: nuxtApp.$toDatetimeString(newTag.createdAt),
      updatedAt: nuxtApp.$toDatetimeString(newTag.updatedAt)
    }
    const tagDocRef = await addDoc(
      collection(getFirestore(nuxtApp.$fire), 'tags'),
      tag
    )
    this._tags.value.push({ ...tag, id: tagDocRef.id })
  }

  async delete (tagNames: string[]) {
    for (const name of tagNames) {
      const snapshots = await getDocs(
        query(
          collection(getFirestore(nuxtApp.$fire), 'tags'),
          where('name', '==', name)
        )
      )
      snapshots.forEach(async s => await deleteDoc(s.ref))
    }
    tagNames.forEach((name) => {
      this._tags.value = this._tags.value.filter(tag => tag.name !== name)
    })
  }
}

/**
 * ユーザに紐づくタグの状態を初期化する
 * @param {string} userId
 */
const createState = async (userId: string): Promise<TagState[]> => {
  // doc.data() => { name: 'tagName', updatedAt: 'date', createdAt: 'date' }
  const snapshots = await getDocs(
    query(
      collection(getFirestore(nuxtApp.$fire), 'tags'),
      where('userId', '==', userId)
    )
  )
  return snapshots.docs.map((doc) => {
    const tag = doc.data()
    return {
      id: doc.data().id,
      name: tag.name,
      userId: tag.userId,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt
    }
  })
}

export const useTag = async (): Promise<Tags> => {
  const states = await createState(user.current.id)
  return new Tags(states)
}
