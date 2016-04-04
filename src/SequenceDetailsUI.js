var React = require('react')
var DOM = require('react-dom')

module.exports = React.createClass({
  onMouseMove: function (e) {
    e.preventDefault()
    if (!this.props.state.resizing) return

    var { mouse, queue } = this.props
    var bcr = this.refs.el.getBoundingClientRect()
    var mouseHeight = mouse.current[1] - bcr.top
    var height = (1 - mouseHeight / bcr.bottom) * 100

    queue.push({ type: 'drawer.resize', height: height })
  },

  onMouseUp: function (e) {
    var { queue, state: { resizing }} = this.props

    if (resizing) queue.push({ type: 'drawer.resize-end' })
  },

  render: function () {
    var { mouse, queue, state: { resizing, drawer, grid }} = this.props
    var drawerHeight = drawer.height + '%' 
    var gridHeight = (100 - drawer.height) + '%' 
    var uiStyle = {
      display: 'flex',
      flexFlow: 'column nowrap'
    }

    return (
      <div className="layer" ref="el" onMouseMove={ this.onMouseMove } onMouseUp={ this.onMouseUp }>
        <GridComponent resizing={ resizing } height={ gridHeight } grid={ grid } queue={ queue }/>
        <DrawerComponent resizing={ resizing } height={ drawerHeight } drawer={ drawer } queue={ queue }/>
      </div>
    )
  }
})

function DrawerComponent (props) {
  var { drawer, queue, resizing } = props
  var onMouseDown = function () { 
    queue.push({ type: 'drawer.resize-start' })
  }
  var style = {
    height: props.height 
  }

  return (
    <div className="drawer" style={ style }>
      <div className="edge edge-top" onMouseDown={ onMouseDown }></div>
      <h2>DRAWER</h2>
    </div>
  )  
}

function GridComponent ({ grid, height, resizing }) {
  var { rowCount, columnCount, cards } = grid
  var cellWidth = 100 / columnCount + '%'
  var cellHeight = 100 / rowCount + '%'
  var cardComponents = []
  var cellCount = columnCount * rowCount
  var cells = []
  var style = {
    height: height
  }
  var cellsStyle = {
    display: 'flex',
    flexFlow: 'row wrap'
  }

  if (resizing) {
    for (var i = 0; i < cellCount; i++) {
      cells.push(<CellComponent key={ i } width={ cellWidth } height= { cellHeight } />)
    }
  }

  for (var j = 0, card; card = cards[j]; j++) {
    cardComponents.push(<CardComponent key={ card.objectId } card={ card } grid={ grid }/>)
  }

  return (
    <div className="grid layers" style={ style }>
      <div className="cells layer" style={ cellsStyle }>
        { cells }
      </div>
      <div className="cards layer">
        { cardComponents }
      </div>
    </div>
  ) 
}

function CellComponent ({ width, height }) {
  var style = {
    width: width,
    height: height
  }
  return (
    <div className="cell" style={ style }></div>
  )
}    

function CardComponent ({ card, grid }) {
  var x = card.x * 100 + '%'
  var y = card.y / card.height * 100 + '%'
  var width = 100 / grid.columnCount + '%'
  var height = 100 / grid.rowCount * card.height + '%'
  var style = {
    width: width,
    height: height,
    transform: 'translate(' + x + ',' + y + ')',
    padding: '4px'
  }

  return (
    <div className="card" style={ style }>
      { card.content }
    </div>
  )
}
