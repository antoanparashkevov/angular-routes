export class FakeAuth {
  loggedIn: boolean = false;

  isAuthenticated() {
    return new Promise((resolve,reject)=>{
      setTimeout( () =>
        resolve(this.loggedIn),2000)
    })

  }

  login() {
    this.loggedIn = true;
  }
  logout() {
    this.loggedIn = false;

  }
}
