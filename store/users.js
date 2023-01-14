export const state = () => {
  return {
    id: '',
    name: '',
  }
}

export const getters = {
  getCurrent(state) {
    // セッションストレージの値が有効ならそちらを優先
    const uid = sessionStorage.getItem('uid')
    const name = sessionStorage.getItem('name')
    if (uid || name) {
      return {
        id: uid,
        name,
      }
    }

    return {
      id: state.id,
      name: state.name,
    }
  },
  isAuthenticated(state) {
    return sessionStorage.getItem('uid') || ( state.name !== '' || state.id !== '')
  }
}

export const mutations = {
  set(state, user) {
    state.name = user.name
    state.id = user.id
  }
}
