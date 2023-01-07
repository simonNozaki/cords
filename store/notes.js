export const state = () => {
  return {
    list: [],
  }
}

export const actions = {
  async add(context, note) {
    note.tag = note.tag ? note.tag : 'なし'
    note.updatedAt = getDateString(note.updatedAt)
    let id;
    await this.$fire.firestore.collection('notes').add({
      title: note.title,
      tag: note.tag,
      body: note.body,
      updatedAt: note.updatedAt,
    })
      .then((docRef) => {
        id = docRef.id;
      });
    note.id = id
    context.commit('put', note)
  },
  async set(context, note) {
    note.updatedAt = getDateString(note.updatedAt)
    await this.$fire.firestore.collection('notes').doc(note.id).set({
      title: note.title,
      tag: note.tag,
      body: note.body,
      updatedAt: note.updatedAt,
    })
    context.commit('update', note)
  },
  async fetchAll(context) {
    const notes = []
    // doc.data() => { name: 'tagName', updatedAt: 'date', createdAt: 'date' }
    await this.$fire.firestore.collection('notes').get()
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
    this.$fire.firestore.collection('notes')
      .doc(id)
      .delete()
      .then(_ => _)
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
  },
  remove(state, id) {
    state.list = state.list.filter((note) => note.id !== id)
  },
}

function getDateString(date) {
  const y = date.getFullYear()
  const month = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  return `${y}-${month}-${d} ${h}:${m}:${s}`
}
