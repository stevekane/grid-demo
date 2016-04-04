module.exports = ClockSignal

function ClockSignal (timeFn) {
  timeFn = timeFn || Date.now()

  this.last = timeFn()
  this.now = timeFn()
  this.timeFn = timeFn
  this.dT = this.now - this.last
}

ClockSignal.update = function (cs) {
  cs.last = cs.now
  cs.now = cs.timeFn()
  cs.dT = cs.now - cs.last
}
