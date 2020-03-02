class RadialSliderModel {


  current_temperature = 72
  target_temperature = 72
  mode = "off"
  dt = 2
  dtcool = 1.5
  dtheat = 1

  checkMode() {
    if (this.current_temperature > this.target_temperature + (this.dt + this.dtcool)) {
      // + 2.5
      this.mode = "cooling"
    } else if (this.current_temperature < this.target_temperature - (this.dt + this.dtheat)) {
      // - 2
      this.mode = "heating"
    } else if ((this.current_temperature > this.target_temperature - (this.dt - this.dtheat)) && (this.current_temperature < this.target_temperature + (this.dt - this.dtcool))) {
      this.mode = "off"
    }
  }

  setCurrentTemp(new_temp) {
    this.current_temperature = new_temp
    this.checkMode(new_temp)
  }

  setTargetTemp(new_temp) {
    this.target_temperature = new_temp
    this.checkMode(new_temp)
  }
}

export default RadialSliderModel