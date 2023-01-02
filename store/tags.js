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
  }
}

export const mutations = {
  put(state, tag) {
    state.list.push(tag)
  },
}
