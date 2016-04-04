var React = require('react')
var DOM = require('react-dom')
var MouseSignal = require('mouse-signal')
var lorem = require('lorem-ipsum')
var ClockSignal = require('./ClockSignal') //TODO: move to external package?
var GUI = require('./GUI')
var Types = require('./Types')
var doAction = require('./Actions')
var SequenceDetailsUI = require('./SequenceDetailsUI')
var UI = document.getElementById('ui')
var VIEWPORT = document.getElementById('viewport')
var GUI_TARGET = document.getElementById('gui')
var Card = Types.Card

var state = {
  grid: {
    showCells: true,
    rowCount: 4,
    columnCount: 8,
    cards: [
      new Card('Sample', 'Widgets', 0, 0, 1, 2),
      new Card('Sample', 'Variables', 0, 2, 1, 2),
      new Card('Sample', 'Script', 1, 0, 2, 4),
      new Card('Sample', 'Heirarchy', 7, 0, 1, 4),
      new Card('Sample', 'Details', 6, 0, 1, 4)
    ]
  },
  drawer: {
    height: 30
  },
  resizing: false
}
var clock = new ClockSignal(performance.now.bind(performance))
var mouse = new MouseSignal
var states = [ state ]
var queue = []
var gui = new GUI({ signals: { mouse: mouse, clock: clock }, state: state })

// Pass in state and states here?  maybe the store?
function update (dT) {
  var mode = mouse.left.mode

  for (var i = 0, action; action = queue[i]; i++) {
    state = doAction(action, state) 
  }
  queue.splice(0)
}

function render () {
  //GUI.render(gui)
  DOM.render(<SequenceDetailsUI mouse={ mouse } state={ state } queue={ queue }/>, UI)
}

function makeLoop () {
  return function loop () {
    ClockSignal.update(clock)
    MouseSignal.update(clock.dT, mouse)
    update(clock.dT)
    render()
    requestAnimationFrame(loop) 
  }
}

//GUI_TARGET.appendChild(gui.domElement)
for (var key in mouse.eventListeners) {
  document.body.addEventListener(key, mouse.eventListeners[key])
}

requestAnimationFrame(makeLoop())
