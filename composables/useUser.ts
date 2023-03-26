import { Ref } from 'vue'

interface UserState {
  id: string,
  name: string
}

class User {
  private _user: Ref<UserState>
  constructor (_state: UserState) {
    this._user = useState('user', () => _state)
  }

  setState (id: string, name: string) {
    this.current.id = id
    this.current.name = name
  }

  resetState () {
    this.current.id = ''
    this.current.name = ''
  }

  isAuthenticated () {
    // TODO: 先に式として評価しておくことで期待した真偽値になる（なぜ？）
    // eslint-disable-next-line no-unused-expressions
    this.current.name !== '' || this.current.id !== ''
    return (
      !!sessionStorage.getItem('uid') || this.current.name !== '' || this.current.id !== ''
    )
  }

  get current (): UserState {
    return this._user.value
  }
}

const createState = (): UserState => {
  const id = sessionStorage.getItem('uid')
    ? sessionStorage.getItem('uid') ?? ''
    : ''
  const name = sessionStorage.getItem('name')
    ? sessionStorage.getItem('name') ?? ''
    : ''
  return {
    id,
    name
  }
}

export const useUser = (): User => {
  const state = createState()
  return new User(state)
}
