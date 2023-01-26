import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  deleteDoc,
  where,
  query
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
  async add(context, newTag) {
    const tag = {
      name: newTag.tagName,
      userId: newTag.userId,
      createdAt: this.$toDatetimeString(newTag.createdAt),
      updatedAt: this.$toDatetimeString(newTag.updatedAt),
    }
    const tagDocRef = await addDoc(collection(getFirestore(this.$fire), 'tags'), tag)
    tag.id = tagDocRef.id
    context.commit('put', tag)
  },
  async delete(context, tagNames) {
    for (const name of tagNames) {
      const snapshots = await getDocs(query(collection(
        getFirestore(this.$fire), 'tags'),
        where('name', '==', name)
      ))
      snapshots.forEach(async (s) => (await deleteDoc(s.ref)))
    }
    context.commit('remove', tagNames)
  },
  async fetchAll(context, userId) {
    const tags = []
    // doc.data() => { name: 'tagName', updatedAt: 'date', createdAt: 'date' }
    const snapshots = await getDocs(query(
      collection(getFirestore(this.$fire), 'tags'), where('userId', '==', userId)
    ))
    snapshots.forEach((doc) => {
      const tag = doc.data()
      tag.id = doc.id
      tags.push(tag)
    })
    context.commit('init', tags)
  },
}

export const mutations = {
  init(state, tags) {
    state.list = tags
  },
  put(state, tag) {
    state.list.push(tag)
  },
  remove(state, tagNames) {
    tagNames.forEach((name) => {
      state.list = state.list.filter((tag) => tag.name !== name)
    })
  },
}
