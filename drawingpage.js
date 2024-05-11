const DrawingBoard = document.getElementById("drawing-board")
const CTX = DrawingBoard.getContext("2d")
const Increment = document.getElementById("increment")
const Decrement = document.getElementById("decrement")
const Display = document.getElementById("display")
const Clear = document.getElementById("clear")
let LINE_SIZE = 10
let isDrawing = false

DrawingBoard.width = window.innerWidth
DrawingBoard.height = window.innerHeight

DrawingBoard.addEventListener("mouseup", () => {
    isDrawing = false
})
DrawingBoard.addEventListener("mousedown", () => {
    isDrawing = true
    CTX.beginPath()
})
DrawingBoard.addEventListener("mousemove", (event) => {
    if (!isDrawing) { return }
    CTX.lineWidth = LINE_SIZE
    CTX.lineCap = "round"
    CTX.lineTo(event.clientX, event.clientY)
    CTX.stroke()
    CTX.beginPath()
    CTX.moveTo(event.clientX, event.clientY)
})
Increment.addEventListener("click", () => {
    if ((LINE_SIZE + 1) === 25) { return }
    LINE_SIZE += 1
    Display.innerText = LINE_SIZE
})
Decrement.addEventListener("click", () => {
    if ((LINE_SIZE - 1) === 0) { return }
    LINE_SIZE -= 1
    Display.innerText = LINE_SIZE
})
Clear.addEventListener("click", () => {
    CTX.clearRect(0, 0, DrawingBoard.width, DrawingBoard.height)
})