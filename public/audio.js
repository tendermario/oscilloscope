// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

// create Oscillator node
export const oscillator = audioCtx.createOscillator()

// ∿∿∿
oscillator.type = 'sine'

// Frequencies
const g = '392'
const other = '240'
const frequency = other  // value in hertz

// Set the frequency to play right now to be this frequency
oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime)

// Default destination is the speakers
oscillator.connect(audioCtx.destination)

// Visualizer //

// Lets just hard code the oscillator as our source for now...
const source = oscillator
// Analyzer for looking at the audio
export const analyser = audioCtx.createAnalyser()
// Connect to it
source.connect(analyser)

// Amount of data points we have
var bufferLength = 180
// Create array to store data
export const dataArray = new Uint8Array(bufferLength)

analyser.getByteTimeDomainData(dataArray)
