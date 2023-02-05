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
import { useUserStore } from '@/store/user.store'
const nuxtApp = useNuxtApp()
const userStore = useUserStore()

// TODO: ファイルに切り出したい、ドメインオブジェクト化
export interface Note {
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
    findAll (state: State): Note[] {
      return state.list
    }
  },
  actions: {
    async add (note: Note) {
      note.tag = note.tag ? note.tag : 'なし'
      const newNote = {
        ...note,
        userId: userStore.getCurrent.id,
        createdAt: nuxtApp.$toDatetimeString(note.createdAt),
        updatedAt: nuxtApp.$toDatetimeString(note.updatedAt)
      }
      const noteDocRef = await addDoc(
        collection(getFirestore(nuxtApp.$fire), 'notes'),
        newNote
      )
      newNote.id = noteDocRef.id
      this.list.push(newNote)
    },
    async set (note: Note) {
      note.updatedAt = nuxtApp.$toDatetimeString(note.updatedAt)
      await setDoc(doc(getFirestore(nuxtApp.$fire), 'notes', note.id), {
        title: note.title,
        tag: note.tag,
        body: note.body,
        userId: note.userId,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
      })
      const _note = this.list.find(elm => elm.id.toString() === note.id)
      // TODO: 存在しない場合はエラーのほうが安全
      if (_note) {
        _note.title = note.title
        _note.tag = note.tag
        _note.body = note.body
        _note.updatedAt = note.updatedAt
      }
    },
    async fetchAll (userId: string) {
      // doc.data() => { name: 'tagName', updatedAt: 'date', createdAt: 'date' }
      const snapshots = await getDocs(
        query(
          collection(getFirestore(nuxtApp.$fire), 'notes'),
          where('userId', '==', userId)
        )
      )
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
      return this.list
    },
    async delete (id: string) {
      await deleteDoc(doc(getFirestore(nuxtApp.$fire), 'notes', id))
      this.list = this.list.filter(note => note.id !== id)
    }
  }
})
