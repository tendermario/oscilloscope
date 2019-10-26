const DEFAULT_OSCILLATOR_TYPE = 'sine'
const DEFAULT_BUFFERLENGTH = 180
const STATUSES = {
  stopped: 'stopped',
  playing: 'playing',
}

export default class Oscilloscope {
  constructor(frequencies) {
    if (!Array.isArray(frequencies) || frequencies.length === 0) {
      throw new Error('Oscilloscope constructor: please provide an array of frequencies.')
    }

    // Create web audio API context
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()

    // Create oscillator nodes, one for each frequency
    this.oscillators = frequencies.map(f => {
      const oscillator = this.audioCtx.createOscillator();

      // ∿∿∿
      oscillator.type = DEFAULT_OSCILLATOR_TYPE
      oscillator.frequency.setValueAtTime(f, this.audioCtx.currentTime)
      oscillator.connect(this.audioCtx.destination)

      return oscillator
    })

    // Create analysers, one for each oscillator
    this.analysers = this.oscillators.map(o => {
      const analyser = this.audioCtx.createAnalyser()

      o.connect(analyser)

      return analyser
    })

    // Create dataArrays, one for each analyser
    // TODO: modulate size of these based on frequency of oscillators
    this.dataArrays = []
    for (let i = 0; i < this.analysers.length; i++) {
      this.dataArrays.push(new Uint8Array(DEFAULT_BUFFERLENGTH))
    }

    this.status = STATUSES.stopped
  }

  // Abstract method for applying a function to either oscillators or analysers
  passThrough(nodeArray, fnName, args) {
    return nodeArray.map((n, i) => n[fnName](args && args[i] || undefined))
  }

  start() {
    this.passThrough(this.oscillators, 'start')

    this.status = STATUSES.playing
  }

  stop() {
    this.passThrough(this.oscillators, 'stop')

    this.status = STATUSES.stopped
  }

  getByteTimeDomainData() {
    this.passThrough(this.analysers, 'getByteTimeDomainData', this.dataArrays)

    return this.dataArrays
  }
}
