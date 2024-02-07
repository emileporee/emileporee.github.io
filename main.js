const Audio1 = new Audio
let AudioCTX = new AudioContext
Audio1.src = "laughing.mp3"

function playaudio() {
Audio1.play()
}

function stopaudio() {
Audio1.pause()
}
