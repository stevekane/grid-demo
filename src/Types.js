var UUID = require('node-uuid')

module.exports.Card = Card

function Card (type, title, x, y, w, h) {
  this.objectId = UUID()
  this.type = type
  this.title = title
  this.x = x
  this.y = y
  this.width = w
  this.height = h
}
