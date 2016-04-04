module.exports = doAction

var Drawer = {
  resizeStart: function resizeStart (action, state) {
    return { ...state, resizing: true }
  },
  resize: function resize ({ height }, state) {
    return { ...state, drawer: { ...state.drawer, height: height }} 
  },
  resizeEnd: function resizeEnd (action, state) {
    return { ...state, resizing: false } 
  }
}

function doAction (action, state) {
  switch (action.type) {
    case 'drawer.resize-start': return Drawer.resizeStart(action, state)
    case 'drawer.resize':       return Drawer.resize(action, state)
    case 'drawer.resize-end':   return Drawer.resizeEnd(action, state)
    default:                    return { ...state }
  }
}
