class Thermostat {
  constructor(currentTemp, targetTemp, dT, dTcool, dTheat) {
    this.currentTemp = currentTemp
    this.targetTemp = targetTemp
    this.dT = dT
    this.dTcool = dTcool
    this.dTheat = dTheat
    this.checkMode()
  }

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

export default Thermostat