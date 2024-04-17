const NodeElement = document.getElementById("node")
const Line = document.getElementById("line")
const Visualizer = document.getElementById("visualizer")
const Play = document.getElementById("play")
const Stop = document.getElementById("stop")
const KeepVisOnScreen = document.getElementById("keepvisonscreen")
const Restart = document.getElementById("restart")
const Station = document.getElementById("station")
const InstrumentSelectionLabel = document.getElementById("instrumentselection")
const TempoLabel = document.getElementById("tempo")
const TempoChanger = document.getElementById("tempochanger")
const BarLabel = document.getElementById("barlabel")
const Instruments = [...document.getElementsByClassName("instrument")]
const Keys = [...document.getElementsByClassName("key")]
const SharpKeys = [...document.getElementsByClassName("sharpkey")]
const NotesList = {A: 0, ASharp: 0, B: 0, C: 0, CSharp: 0, D: 0, F: 0, FSharp: 0, G: 0}
const NoteSFX = {
    E_Guitar: "E_Guitar.mp3",
    A_Guitar: "A_Guitar.mp3",
    D_Guitar: "D_Guitar.mp3",
    G_Guitar: "G_Guitar.mp3",
    B_Guitar: "B_Guitar.mp3",
    e_Guitar: "E_Guitar.mp3",
    A_Piano: "A_Piano.mp3",
    ASharp_Piano: "ASharp_Piano.mp3",
    B_Piano: "B_Piano.mp3",
    C_Piano: "C_Piano.mp3",
    CSharp_Piano: "CSharp_Piano.mp3",
    D_Piano: "D_Piano.mp3",
    F_Piano: "F_Piano.mp3",
    FSharp_Piano: "FSharp_Piano.mp3",
    ClosedHiHat_Drums: "ClosedHiHat_Drums.mp3",
    OpenHiHat_Drums: "OpenHiHat_Drums.mp3",
    Kick_Drums: "Kick_Drums.mp3",
    Snare_Drums: "Snare_Drums.mp3
}
let MAX_BARS = 10
let IsPlaying = false
let IsVisAlwaysOnScreen = false
let Notes = {}
let InstrumentSelection = "Guitar"
let Tempo = 1
let Bar = 0
let Loop

class Note {
    constructor(noteType) {
        if (NotesList[noteType] != undefined) {
            this.InstrumentType = InstrumentSelection
            this.NoteType = noteType + "_" + InstrumentSelection
            this.Bar = Bar
            this.Id = `${InstrumentSelection}${noteType}_${NotesList[noteType]}`
        }
    }
}

function KeyClick(noteType) {
    if (IsPlaying === true) { return }
    const NewNote = new Note(noteType)
    const NewNode = NodeElement.cloneNode(true)
    Notes[NewNote.Id] = NewNote
    NotesList[noteType] += 1
    NewNode.id = NewNote.Id
    NewNode.innerText = NewNote.Id
    if (InstrumentSelection === "Guitar") {
        NewNode.style.top = Number(Visualizer.style.top.replaceAll("px", "")) + 150 + "px"
    }
    else if (InstrumentSelection === "Piano") {
        NewNode.style.top = Number(Visualizer.style.top.replaceAll("px", "")) + 200 + "px"
    }
    else if (InstrumentSelection === "Drums") {
        NewNode.style.top = Number(Visualizer.style.top.replaceAll("px", "")) + 250 + "px"
    }
    NewNode.style.left = Line.style.left
    NewNode.style.display = "block"
    document.body.appendChild(NewNode)
    Line.style.left = Number(Line.style.left.replaceAll("px", "")) + 225 + "px"
    if (NoteSFX[noteType] && NoteSFX[noteType] != "") {
        const Sound = new Audio(NoteSFX[noteType])
        Sound.src = NoteSFX[noteType]
        Sound.play()
    }
}

function InstrumentChange(instrument) {
    if (InstrumentSelection != instrument) {
        InstrumentSelection = instrument
        InstrumentSelectionLabel.innerText = `Instrument: ${instrument}`
    }
}

function MoveLine(amount) {
    let CurrentPosition = Number(Line.style.left.replaceAll("px", ""))
    Line.style.left = CurrentPosition + amount + "px"
    Bar = Math.floor((CurrentPosition / window.innerWidth) * MAX_BARS)
    BarLabel.innerText = `Bar ${Bar}`
    for (let i in Notes) {
        if (i.Bar == Bar && NoteSFX[i.NoteType] && NoteSFX[i.NoteType] != "") {
            const Sound = new Audio(NoteSFX[i.NoteType])
            Sound.src = NoteSFX[i.NoteType]
            Sound.play()
        }
    }
    return CurrentPosition >= window.innerWidth
}

Instruments.forEach((instrument) => {
    instrument.addEventListener("click", () => {
        InstrumentChange(instrument.id)
    })
})

TempoChanger.addEventListener("change", () => {
    TempoLabel.innerText = `Tempo (BPM) = ${TempoChanger.value}`
    Tempo = TempoChanger.value
})

Keys.forEach((key) => {
    key.addEventListener("click", () => {
        KeyClick(key.id)
    })
})

SharpKeys.forEach((sharpkey) => {
    sharpkey.addEventListener("click", () => {
        KeyClick(sharpkey.id)
    })
})

Play.addEventListener("click", () => {
    IsPlaying = true
    if (Number(Line.style.left.replaceAll("px", "")) >= window.innerWidth) {
        Line.style.left = 0 + "px"
    }
    Loop = setInterval(() => {
        let Result = MoveLine(Tempo / 2)
        if (Result === true) {
            clearInterval(Loop)
            Loop = undefined
            IsPlaying = false
        }
    }, 10)
})

Stop.addEventListener("click", () => {
    if (Loop) {
        clearInterval(Loop)
        Loop = undefined
        IsPlaying = false
    }
})

KeepVisOnScreen.addEventListener("click", () => {
    if (IsVisAlwaysOnScreen === true) {
        IsVisAlwaysOnScreen = false
        Visualizer.style.position = "relative"
        KeepVisOnScreen.innerText = "KeepVisOnScreen"
    }
    else if (IsVisAlwaysOnScreen === false) {
        IsVisAlwaysOnScreen = true
        Visualizer.style.position = "fixed"
        Visualizer.style.top = 0 + "px"
        Visualizer.style.height = 50 + "vh"
        KeepVisOnScreen.innerText = "TakeVisOffScreen"
    }
})

Restart.addEventListener("click", () => {
    for (let i in NotesList) {
        NotesList[i] = 0
    }
    if (Loop) {
        clearInterval(Loop)
        Loop = undefined
        IsPlaying = false
    }
    if (IsVisAlwaysOnScreen) {
        Visualizer.style.position = "relative"
        Visualizer.style.height = 100 + "vh"
        KeepVisOnScreen.innerText = "KeepVisOnScreen"
        IsVisAlwaysOnScreen = false
    }
    Line.style.left = 0 + "px"
    MAX_BARS = 10
    Bar = 0
    InstrumentSelection = "None"
    Tempo = 1
    TempoChanger.value = 50
    InstrumentSelectionLabel.innerText = "Instrument: Guitar"
    TempoLabel.innerText = "Tempo (BPM) = 1"
    BarLabel.innerText = "Bar 0"
})

window.addEventListener("keypress", (event) => {
    if (event.code === "Space" && !Loop) {
            event.preventDefault()
            IsPlaying = true
            if (Number(Line.style.left.replaceAll("px", "")) >= window.innerWidth) {
                Line.style.left = 0 + "px"
            }
            Loop = setInterval(() => {
                let Result = MoveLine(Tempo / 2)
                if (Result === true) {
                    clearInterval(Loop)
                    Loop = undefined
                    IsPlaying = false
                }
            }, 10)
        }
    else if (event.code == "Space" && Loop) {
        event.preventDefault()
        clearInterval(Loop)
        Loop = undefined
        IsPlaying = false
    }
})
