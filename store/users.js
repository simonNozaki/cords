export const state = () => {
  const id = sessionStorage.getItem('uid') ? sessionStorage.getItem('uid') : ''
  const name = sessionStorage.getItem('name') ? sessionStorage.getItem('name') : ''
  return {
    id,
    name,
  }
}

export const getters = {
  getCurrent(state) {
    return {
      id: state.id,
      name: state.name,
    }
  },
  isAuthenticated(state) {
    // TODO: 先に式として評価しておくことで期待した真偽値になる（なぜ？）
    // eslint-disable-next-line no-unused-expressions
    (state.name !== '' || state.id !== '')
    return !!sessionStorage.getItem('uid') || (state.name !== '' || state.id !== '')
  }
}

export const mutations = {
  set(state, user) {
    state.name = user.name
    state.id = user.id
  },
  reset(state) {
    state.id = ''
    state.name = ''
  }
}
