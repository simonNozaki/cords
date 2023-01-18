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
    let id
    const tag = {
      name: newTag.tagName,
      userId: newTag.userId,
      createdAt: this.$toDatetimeString(newTag.createdAt),
      updatedAt: this.$toDatetimeString(newTag.updatedAt),
    }
    await this.$fire.firestore
      .collection('tags')
      .add(tag)
      .then((docRef) => {
        id = docRef.id
      })
    tag.id = id
    context.commit('put', tag)
  },
  async delete(context, tagNames) {
    for (const name of tagNames) {
      const record = await this.$fire.firestore
        .collection('tags')
        .where('name', '==', name)
        .get()
      record.forEach((doc) => {
        doc.ref.delete()
      })
    }
    context.commit('remove', tagNames)
  },
  async fetchAll(context, userId) {
    const tags = []
    // doc.data() => { name: 'tagName', updatedAt: 'date', createdAt: 'date' }
    await this.$fire.firestore
      .collection('tags')
      .where('userId', '==', userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const tag = doc.data()
          tag.id = doc.id
          tags.push(tag)
        })
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
