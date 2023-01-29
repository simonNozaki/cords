import { defineStore } from 'pinia'

interface State {
  id: string,
  name: string
}

export const useUserStore = defineStore('users', {
  state: (): State => {
    const id = sessionStorage.getItem('uid') ? (sessionStorage.getItem('uid') ?? '') : ''
    const name = sessionStorage.getItem('name')
      ? (sessionStorage.getItem('name') ?? '')
      : ''
    return {
      id,
      name,
    }
  },
  getters: {
    getCurrent(state: State) {
      return {
        id: state.id,
        name: state.name,
      }
    },
    isAuthenticated(state: State) {
      // TODO: 先に式として評価しておくことで期待した真偽値になる（なぜ？）
      // eslint-disable-next-line no-unused-expressions
      state.name !== '' || state.id !== ''
      return (
        !!sessionStorage.getItem('uid') || state.name !== '' || state.id !== ''
      )
    }
  },
  actions: {
    set(user: State) {
      this.name = user.name
      this.id = user.id
    },
    reset() {
      this.id = ''
      this.name = ''
    },
  }
})
