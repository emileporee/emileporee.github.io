// Posts System
// Variables
const postCreator = document.getElementById("postCreator")
const createPostButton = document.getElementById("createPostButton")
const postCreatorDirector = document.getElementById("postCreatorDirector")
const titleField = document.getElementById("titleField")
const descriptionField = document.getElementById("descriptionField")
const authorAliasField = document.getElementById("authorAliasField")
const imageField = document.getElementById("imageField")
const colorField = document.getElementById("colorField")
const PostLayout = document.getElementById("post")
const errorLog = document.getElementById("errorLog")
const Fullscreen = document.getElementById("fullscreen")
const ExitFullscreen = document.getElementById("exitFullscreen")
const Observer = new IntersectionObserver((observeList) => {
   observeList.forEach((observing) => {
      const Element = observing.target
      Element.classList.add("scrollAnim")
setTimeout(() => {
   Element.classList.remove("scrollAnim")
}, 2000)
   })
})
let AMOUNT_OF_POSTS = 0
let creatorVisible = false
let IMAGE_FULLSCREENING = false

postCreator.style.display = "none"
PostLayout.style.display = "none"

function error(context) {
   errorLog.innerText = "Error: " + context || "This is an error"
   errorLog.style.display = "block"
   setTimeout(() => {
      errorLog.style.display = "none"
   }, 2500)
}

createPostButton.addEventListener("click", () => {
   const Post = PostLayout.cloneNode(true)
   const Header = Post.querySelector("h1")
   const Label = Post.querySelector("label")
   const Paragraph = Post.querySelector("p")
   const Image = Post.querySelector("img")
   if (titleField.value.length > 0 && titleField.value.length < 35) {
      Header.innerHTML = titleField.value
   }
   else if (titleField.value.length < 0){
      error("Your title must be at least 1 character long")
      return
   }
   else if (titleField.value.length >= 35) {
      error("Your title cannot be more than 35 characters")
      return
   }
   if (descriptionField.value.length > 0) {
      Paragraph.innerHTML = descriptionField.value
   }
   else if (descriptionField.value.length >= 100){
      error("Your description cannot be 100 or more characters")
      return
   }
   if (authorAliasField.value.length > 0 && authorAliasField.value.length <= 15) {
      Label.innerHTML = "Author: " + authorAliasField.value + " @unknown"
   }
   else if (authorAliasField.value.length > 15 && authorAliasField.value.length > 0) {
      error("Your alias must be under 15 characters")
      return
   }
   if (imageField.files.length === 1) {
      Image.src = URL.createObjectURL(imageField.files[0])
   }
   if (colorField.value != "" || colorField.value != undefined || colorField.value != null) {
      Post.style.backgroundColor = colorField.value
   }
   else {
      error("You must have a background color. This error is rare so you should probably just refresh the page")
      return
   }
   AMOUNT_OF_POSTS += 1
   Post.id = "post" + AMOUNT_OF_POSTS
   creatorVisible = false
   postCreatorDirector.innerHTML = "Open Post Creator"
   document.body.appendChild(Post)
   Post.style.display = "block"
   Observer.observe(Post)
   postCreator.style.display = "none"
   const deleteButton = Post.querySelector("#deleteButton")

Image.addEventListener("click", () => {
   Fullscreen.style.backgroundImage = "url(" + Image.src + ")"
   Fullscreen.style.display = "block"
})
   deleteButton.addEventListener("click", () => {
   const Result = window.prompt("You sure you wanna delete this post? Answer with \"Yes\" or \"No\"")
if (Result.toLowerCase() === "no" || Result.toLowerCase() != "yes") { return }
else if (Result.toLowerCase() === "yes") {
      document.body.removeChild(Post)
   Post = null
   AMOUNT_OF_POSTS -= 1
     }
   })
})
postCreatorDirector.addEventListener("click", () => {
   if (AMOUNT_OF_POSTS === 5) {
      alert("You've ran out of posts!")
      return
   }
   else if (AMOUNT_OF_POSTS + 1 === 5) {
      alert("You only have one post left!")
   }
   if (creatorVisible === false) {
      postCreator.style.display = "block"
      postCreatorDirector.innerHTML = "Close Post Creator"
      creatorVisible = true
   }
   else {
     postCreator.style.display = "none"
     creatorVisible = false
     postCreatorDirector.innerHTML = "Open Post Creator"
   }
})

ExitFullscreen.addEventListener("click", () => {
   Fullscreen.style.display = "none"
})
