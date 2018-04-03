import UserStore from './userStore'

class RootStore {
  constructor () {
    this.userStore = new UserStore(this)
  }
}

export default RootStore