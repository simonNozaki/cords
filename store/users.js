export const state = () => {
  return {
    id: '',
    name: '',
  }
}

export const getters = {
  getCurrent(state) {
    return {
      id: state.id,
      name: state.name,
    }
  },
  isAuthenticated() {
    return state.name !== '' && state.id !== ''
  }
}

export const mutations = {
  set(state, user) {
    state.name = user.name
    state.id = user.id
  }
}
