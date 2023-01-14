export const state = () => {
  return {
    accountName: '',
  }
}

export const getters = {
  findCurrentUser(state) {
    return state.accountName
  }
}

export const mutations = {
  set(state, accountName) {
    state.accountName = accountName
  }
}
