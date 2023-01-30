import { defineStore } from 'pinia'
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
const { $toDatetimeString, $fire } = useNuxtApp()
import { useUserStore } from '@/store/user.store'

// TODO: ファイルに切り出したい
interface Note {
  id: string
  title: string
  tag: string
  body: string
  userId: string
  createdAt: string
  updatedAt: string
}

interface State {
  list: Note[]
}

export const useNoteStore = defineStore('notes', {
  state: (): State => {
    return {
      list: []
    }
  },
  getters: {
    findAll(state: State): Note[] {
      return state.list
    },
  },
  actions: {
    async add(note: Note) {
      const currentUser = useUserStore().getCurrent
      note.tag = note.tag ? note.tag : 'なし'
      const noteDocRef = await addDoc(collection(getFirestore($fire), 'notes'), {
        title: note.title,
        tag: note.tag,
        body: note.body,
        userId: currentUser.id,
        createdAt: $toDatetimeString(note.createdAt),
        updatedAt: $toDatetimeString(note.updatedAt)
      })
      note.id = noteDocRef.id
      this.list.push(note)
    },
    async set(note: Note) {
      note.updatedAt = $toDatetimeString(note.updatedAt)
      await setDoc(doc(getFirestore($fire), 'notes', note.id), {
        title: note.title,
        tag: note.tag,
        body: note.body,
        userId: note.userId,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      })
      const _note = this.list.find((elm) => elm.id.toString() === note.id)
      // TODO: 存在しない場合はエラーのほうが安全
      if (_note) {
        _note.title = note.title
        _note.tag = note.tag
        _note.body = note.body
        _note.updatedAt = note.updatedAt
      }
    },
    async fetchAll(userId: string) {
      // doc.data() => { name: 'tagName', updatedAt: 'date', createdAt: 'date' }
      const snapshots = await getDocs(query(      
        collection(getFirestore($fire), 'notes'), where('userId', '==', userId)
      ))
      this.list = snapshots.docs.map((doc) => {
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
    },
    async delete(id: string) {
      await deleteDoc(doc(getFirestore($fire), 'notes', id))
      this.list = this.list.filter((note) => note.id !== id)
    },
  }
})
