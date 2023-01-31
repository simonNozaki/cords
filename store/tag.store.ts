import { defineStore } from 'pinia'
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  deleteDoc,
  where,
  query
} from 'firebase/firestore'
const nuxtApp = useNuxtApp()

interface Tag {
  id: string
  name: string
  userId: string
  createdAt: string
  updatedAt: string
}

interface State {
  list: Tag[]
}

export const useTagStore = defineStore('tags', {
  state: (): State => {
    return {
      list: []
    }
  },
  getters: {
    findAll(state): Tag[] {
      return state.list
    }
  },
  actions: {
    async add(newTag: Tag) {
      const tag = {
        name: newTag.name,
        userId: newTag.userId,
        createdAt: nuxtApp.$toDatetimeString(newTag.createdAt),
        updatedAt: nuxtApp.$toDatetimeString(newTag.updatedAt),
      }
      const tagDocRef = await addDoc(collection(getFirestore(nuxtApp.$fire), 'tags'), tag)
      this.list.push({ ...tag, id: tagDocRef.id })
    },
    async delete(tagNames: string[]) {
      for (const name of tagNames) {
        const snapshots = await getDocs(query(collection(
          getFirestore(nuxtApp.$fire), 'tags'),
          where('name', '==', name)
        ))
        snapshots.forEach(async (s) => (await deleteDoc(s.ref)))
      }
      tagNames.forEach((name) => {
        this.list = this.list.filter((tag) => tag.name !== name)
      })
    },
    async fetchAll(userId: string) {
      const tags: Tag[] = []
      // doc.data() => { name: 'tagName', updatedAt: 'date', createdAt: 'date' }
      const snapshots = await getDocs(query(
        collection(getFirestore(nuxtApp.$fire), 'tags'), where('userId', '==', userId)
      ))
      snapshots.forEach((doc) => {
        const tag = doc.data()
        tag.id = doc.id
        tags.push({
          id: doc.data().id,
          name: tag.name,
          userId: tag.userId,
          createdAt: tag.createdAt,
          updatedAt: tag.updatedAt,
        })
      })
      this.list = tags
    }
  }
})
