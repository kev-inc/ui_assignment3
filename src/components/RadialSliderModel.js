class RadialSliderModel {

  currentTemp = 72
  targetTemp = 72
  mode = "off"
  dt = 2
  dtcool = 1.5
  dtheat = 1

  checkMode() {
    if (this.currentTemp > this.targetTemp + this.dt + this.dtcool) {
      this.mode = "cooling"
    } else if (this.currentTemp < this.targetTemp - this.dt - this.dtheat) {
      this.mode = "heating"
    } else if ((this.currentTemp > this.targetTemp - (this.dt - this.dtheat)) && (this.currentTemp < this.targetTemp + (this.dt - this.dtcool))) {
      this.mode = "off"
    }
  }

  setCurrentTemp(newTemp) {
    this.currentTemp = newTemp
    this.checkMode(newTemp)
  }

  setTargetTemp(newTemp) {
    this.targetTemp = newTemp
    this.checkMode(newTemp)
  }
}

export default RadialSliderModel