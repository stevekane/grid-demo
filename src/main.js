var R = require('react')
var DOM = require('react-dom')
var dat = require('dat-gui')
var OVERLAY = document.getElementById('overlay')
var GRID = document.getElementById('grid')
var CELLS = document.getElementById('cells')
var CARDS = document.getElementById('cards')
var DRAWER = document.getElementById('drawer')
var DRAWER_EDGE = document.getElementById('edge')

function update () {

}

function render() {
  var cellWidth = (100 / state.grid.columnCount) + '%'
  var cellHeight = (100 / state.grid.rowCount) + '%'
  
  while (CELLS.firstChild) CELLS.removeChild(CELLS.firstChild)
  while (CARDS.firstChild) CARDS.removeChild(CARDS.firstChild)
  
  DRAWER.style.height = `${ state.drawer.height }%`
  GRID.style.height = `${ 100 - state.drawer.height }%`
  
  for (var k in gui.__controllers) {
    gui.__controllers[k].updateDisplay()
  }
  
  for (var i = 0; i < state.grid.columnCount; i++) {
    for (var j = 0; j < state.grid.rowCount; j++) {
      CELLS.appendChild(CellElement(cellWidth, cellHeight))
    }
  }
  
  
  for (var l = 0, c; c = state.grid.cards[l]; l++) {
    CARDS.appendChild(CardElement(state.grid, c))
  }
}

function makeLoop () {
	var then = Date.now()
	var now = Date.now()
	var dT = now - then

  return function loop () {
    requestAnimationFrame(loop) 
		then = now
		now = Date.now()
		dT = now - then
    update(dT)
    render()
  }
}

var state = {
  grid: {
    rowCount: 4,
    columnCount: 8,
    cards: [
      new Card(0, 0, 3),
      new Card(2, 1, 2)
    ]
  },
  drawer: {
    height: 30
  },
  resizing: false
}
var gui = new dat.GUI()
var gridFolder = gui.addFolder('grid')
var drawerFolder = gui.addFolder('drawer')

function Card (x, y, height) {
  this.x = x
  this.y = y
  this.height = height
}
  
function CardElement (grid, card) {
  var el = document.createElement('div')
  var x = card.x * 100 + '%'
  var y = card.y / card.height * 100 + '%'
  var width = 100 / grid.columnCount + '%'
  var height = 100 / grid.rowCount * card.height + '%'
  
  el.classList.add('card')
  el.style.width = width
  el.style.height = height
  el.style.transform = `translate(${x}, ${y})`
  return el
}

function CellElement (width, height) {
  var cell = document.createElement('div')
  var tile = document.createElement('div')

  cell.classList.add('cell')
  tile.classList.add('tile')
  cell.style.width = width
  cell.style.height = height
  cell.appendChild(tile)
  return cell
}    

gridFolder.closed = false
drawerFolder.closed = false
gridFolder.add(state.grid, 'rowCount').min(1).max(32).step(1)
gridFolder.add(state.grid, 'columnCount').min(1).max(32).step(1)
drawerFolder.add(state.drawer, 'height', 0, 100)

OVERLAY.addEventListener('mousemove', function(e) {
  e.stopPropagation()
  e.preventDefault()
  if (!state.resizing) return

  var mouseHeight = e.clientY
  var bcr = OVERLAY.getBoundingClientRect()
  var newHeightPercent = (1 - mouseHeight / bcr.bottom) * 100

  state.drawer.height = newHeightPercent
})
DRAWER_EDGE.addEventListener('mousedown', function(e) {
  e.preventDefault()

  state.resizing = true
})
OVERLAY.addEventListener('mouseup', function(e) {
  e.preventDefault()

  state.resizing = false
})
requestAnimationFrame(makeLoop())
