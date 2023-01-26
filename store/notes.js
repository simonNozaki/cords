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

export const state = () => {
  return {
    list: [],
  }
}

export const getters = {
  findAll(state) {
    return state.list
  },
}

export const actions = {
  async add(context, note) {
    const currentUser = context.rootGetters['users/getCurrent']
    note.tag = note.tag ? note.tag : 'なし'
    const noteDocRef = await addDoc(collection(getFirestore(this.$fire), 'notes'), {
      title: note.title,
      tag: note.tag,
      body: note.body,
      userId: currentUser.id,
      createdAt: this.$toDatetimeString(note.createdAt),
      updatedAt: this.$toDatetimeString(note.updatedAt)
    })
    note.id = noteDocRef.id
    context.commit('put', note)
  },
  async set(context, note) {
    note.updatedAt = this.$toDatetimeString(note.updatedAt)
    await setDoc(doc(getFirestore(this.$fire), 'notes', note.id), {
      title: note.title,
      tag: note.tag,
      body: note.body,
      userId: note.userId,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    })
    context.commit('update', note)
  },
  async fetchAll(context, userId) {
    const notes = []
    // doc.data() => { name: 'tagName', updatedAt: 'date', createdAt: 'date' }
    const snapshots = await getDocs(query(      
      collection(getFirestore(this.$fire), 'notes'), where('userId', '==', userId)
    ))
    snapshots.forEach((doc) => {
      const note = doc.data()
      note.id = doc.id
      notes.push(note)
    })
    context.commit('init', notes)
  },
  async delete(context, id) {
    await deleteDoc(doc(getFirestore(this.$fire), 'notes', id))
    context.commit('remove', id)
  },
}

export const mutations = {
  init(state, notes) {
    state.list = notes
  },
  put(state, note) {
    state.list.push(note)
  },
  update(state, note) {
    const _note = state.list.find((elm) => elm.id.toString() === note.id)
    _note.title = note.title
    _note.tag = note.tag
    _note.body = note.body
    _note.updatedAt = note.updatedAt
  },
  remove(state, id) {
    state.list = state.list.filter((note) => note.id !== id)
  },
}
