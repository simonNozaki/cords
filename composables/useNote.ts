import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  where,
  query,
  doc
} from 'firebase/firestore'
import { Ref } from 'vue'
import { useUser } from './useUser'
const nuxtApp = useNuxtApp()
const user = useUser()

export interface NoteState {
  id?: string
  title: string
  tag: string
  body: string
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
}

class Notes {
  private _notes: Ref<NoteState[]>
  constructor (_notes: NoteState[]) {
    this._notes = useState('notes', () => _notes)
  }

  findAll (): NoteState[] {
    return this._notes.value
  }

  async add (note: NoteState) {
    note.tag = note.tag ? note.tag : 'なし'
    const newNote = {
      ...note,
      userId: user.current.id,
      createdAt: nuxtApp.$toDatetimeString(note.createdAt),
      updatedAt: nuxtApp.$toDatetimeString(note.updatedAt)
    }
    const noteDocRef = await addDoc(
      collection(getFirestore(nuxtApp.$fire), 'notes'),
      newNote
    )
    this._notes.value.push({ ...newNote, id: noteDocRef.id })
  }

  async set (note: NoteState) {
    note.updatedAt = nuxtApp.$toDatetimeString(note.updatedAt)
    if (!note.id) {
      throw new Error('IDのないメモを更新することはできません')
    }
    await setDoc(doc(getFirestore(nuxtApp.$fire), 'notes', note.id), {
      title: note.title,
      tag: note.tag,
      body: note.body,
      userId: note.userId,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    })
    const _note = this._notes.value
      .filter(elm => elm.id)
      // filterしてるので!で握りつぶしてOK
      .find(elm => elm.id!.toString() === note.id)
    // TODO: 存在しない場合はエラーのほうが安全
    if (_note) {
      _note.title = note.title
      _note.tag = note.tag
      _note.body = note.body
      _note.updatedAt = note.updatedAt
    }
  }

  async delete (id: string) {
    await deleteDoc(doc(getFirestore(nuxtApp.$fire), 'notes', id))
    this._notes.value = this._notes.value.filter(note => note.id !== id)
  }
}

const createState = async (userId: string): Promise<NoteState[]> => {
  const snapshots = await getDocs(
    query(
      collection(getFirestore(nuxtApp.$fire), 'notes'),
      where('userId', '==', userId)
    )
  )
  return snapshots.docs.map((doc) => {
    const note = doc.data()
    return {
      id: doc.id,
      title: note.title,
      tag: note.tag,
      body: note.body,
      userId: note.userId,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    }
  })
}

// TODO: userIdを外から渡して結合度を下げる
export const useNote = async (): Promise<Notes> => {
  const states = await createState(user.current.id)
  return new Notes(states)
}
