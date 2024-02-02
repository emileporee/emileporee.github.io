class User {
constructor(name, userid){
this.Username = name;
this.UserId = userid;
  return this
}
}

let button = document.getElementById("sign+up")
let newUser

button.addEventListener("click", () => {
newUser = new User("TEST_USER", 9249402)
})

if (newUser ~= null and newUser.Username) { console.log(newUser.Username, newUser.UserId) }
