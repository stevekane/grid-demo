var UUID = require('node-uuid')

module.exports.Card = Card

function Card (x, y, height, content) {
  this.objectId = UUID()
  this.x = x
  this.y = y
  this.height = height
  this.content = content
}
