export const state = () => {
  return {
    list: [],
  }
}

export const actions = {
  async add(context, tag) {
    await this.$fire.firestore.collection('tags').add({
      name: tag,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    context.commit('put', tag)
  },
  async fetchAll(context) {
    const tags = []
    // doc.data() => { name: 'tagName', updatedAt: 'date', createdAt: 'date' }
    await this.$fire.firestore.collection('tags').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => tags.push(doc.data().name))
      })
    context.commit('init', tags)
  }
}

export const mutations = {
  init(state, tags) {
    state.list = tags
  },
  put(state, tag) {
    state.list.push(tag)
  },
}
