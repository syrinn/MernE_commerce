export default class CheckAuth {
  userInfo;

  constructor(userInfo) {
    this.userInfo = userInfo;
  }

  get isAuthenticated() {
    return Boolean(this.userInfo) && Boolean(this.userInfo.token);
  }
}
