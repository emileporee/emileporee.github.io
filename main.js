// Music Page
// Variables
const TrebleClef = document.getElementById("trebleClef");
const BassClef = document.getElementById("bassClef");
const WholeNote = document.getElementById("wholeNote");
const HalfNote = document.getElementById("halfNote");
const QuarterNote = document.getElementById("quarterNote");
const EigthNote = document.getElementById("eigthNote");
const SixteenthNote = document.getElementById("sixteenthNote");
const CurrentNoteTypeText = document.getElementById("CNT");
const CurrentClefTypeText = document.getElementById("CCT");
const Undo = document.getElementById("undo");
const ClefSelection = [...document.getElementsByClassName("clefSelection")];
const NoteSelection = [...document.getElementsByClassName("noteSelection")];
const ClefTypes = {
    TrebleClef: TrebleClef,
    BassClef: BassClef
}
const NoteTypes = {
    WholeNote: WholeNote,
    HalfNote: HalfNote,
    QuarterNote: QuarterNote,
    EigthNote: EigthNote,
    SixteenthNote: SixteenthNote
}
let CURRENT_CLEFTYPE = "TrebleClef"
let CURRENT_NOTETYPE = "WholeNote"
let Notes = []

// Notes Class

class Note {
    constructor(noteType, noteValue, position, element) {
        this.NoteType = noteType
        this.NoteValue = noteValue
        this.Element = element
        this.X = position.x
        this.Y = position.y
    }
}

function setPosition(element, position) {
    element.style.position = "absolute"
    element.style.top = position.y
    element.style.left = position.x
}

function placeNote(position) {
    if (NoteTypes[CURRENT_NOTETYPE]) {
        const NewNote = NoteTypes[CURRENT_NOTETYPE].cloneNode(true)
        NewNote.id = "new" + CURRENT_NOTETYPE
        NewNote.className = "notes"
        document.body.appendChild(NewNote)
        NewNote.style.display = "block"
        setPosition(NewNote, position)
        let NoteObject = new Note(CURRENT_NOTETYPE, undefined, position, NewNote)
        Notes.push(NoteObject)
    }
}

// Main Functions

window.addEventListener("click", event => {
    let isOnNote = false
    document.elementsFromPoint(event.x, event.y).forEach((value, _) => {
        if (value.tagName === "IMG" && value.className === "notes") {
            value.remove()
            isOnNote = true
        }
    })
    if (!isOnNote) {
        placeNote(event)
    }
})

ClefSelection.forEach(value => {
    value.addEventListener("click", () => {
        if (ClefTypes[value.id] && CURRENT_CLEFTYPE != value.id) {
            ClefTypes[CURRENT_CLEFTYPE].style.visible = "hidden"
            ClefTypes[value.id].style.visible = "block"
            CURRENT_CLEFTYPE = value.id
            CurrentClefTypeText.innerText = "CURRENT CLEF TYPE: " + value.id
        }
    })
})

NoteSelection.forEach(value => {
    value.addEventListener("click", () => {
        if (NoteTypes[value.id] && CURRENT_NOTETYPE != value.id) {
            CURRENT_NOTETYPE = value.id
            CurrentNoteTypeText.innerText = "CURRENT NOTE TYPE: " + value.id
        }
    })
})