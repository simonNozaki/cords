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
    note.createdAt = this.$toDatetimeString(note.createdAt)
    note.updatedAt = this.$toDatetimeString(note.updatedAt)
    let id
    await this.$fire.firestore
      .collection('notes')
      .add({
        title: note.title,
        tag: note.tag,
        body: note.body,
        userId: currentUser.id,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      })
      .then((docRef) => {
        id = docRef.id
      })
    note.id = id
    context.commit('put', note)
  },
  async set(context, note) {
    note.updatedAt = this.$toDatetimeString(note.updatedAt)
    await this.$fire.firestore.collection('notes').doc(note.id).set({
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
    await this.$fire.firestore
      .collection('notes')
      .where('userId', '==', userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const note = doc.data()
          note.id = doc.id
          notes.push(note)
        })
      })
    context.commit('init', notes)
  },
  delete(context, id) {
    this.$fire.firestore
      .collection('notes')
      .doc(id)
      .delete()
      .then((_) => _)
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
