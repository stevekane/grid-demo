var dat = require('dat-gui')

module.exports = GUI

function GUI ({ state, signals: { mouse, clock }}) {
  var gui = new dat.GUI({ autoPlace: false })
  var gridFolder = gui.addFolder('grid')
  var signalFolder = gui.addFolder('signals')
  var clockSignalFolder = signalFolder.addFolder('clock')
  var mouseSignalFolder = signalFolder.addFolder('mouse')

  gridFolder.closed = false
  signalFolder.closed = false
  mouseSignalFolder.closed = false
  clockSignalFolder.closed = false

  mouseSignalFolder.add(mouse.current, '0')
  mouseSignalFolder.add(mouse.current, '1')

  clockSignalFolder.add(clock, 'dT')

  gridFolder.add(state.grid, 'rowCount').min(1).max(32).step(1)
  gridFolder.add(state.grid, 'columnCount').min(1).max(32).step(1)
  return gui
}

GUI.render = function (gui) {
  for (var i in gui.__controllers) {
    gui.__controllers[i].updateDisplay()
  }
  for (var j in gui.__folders) {
    GUI.render(gui.__folders[j]) 
  }
}
