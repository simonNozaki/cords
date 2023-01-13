export const state = () => {
  return {
    accountName: '',
  }
}

export const getters = {
  findCurrentUser() {
    return this.accountName
  }
}

export const mutations = {
  set(state, accountName) {
    state.accountName = accountName
  }
}
