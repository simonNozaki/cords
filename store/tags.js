export const state = () => {
  return {
    list: [],
  }
}

export const mutations = {
  add(state, tag) {
    state.list.push(tag)
  },
}
