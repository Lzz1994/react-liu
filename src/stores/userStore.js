import { observable } from 'mobx'

class UserStore {
  constructor (rootStore) {
    this.rootStore = rootStore
  }

  @observable user = {}
}

export default UserStore