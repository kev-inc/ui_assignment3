import RadialSliderModel from "./RadialSliderModel";

class RadialSliderViewModel {
  constructor() {
    this.model = new RadialSliderModel()
  }

  getTargetTemp() {
    return this.model.target_temperature
  }

  getCurrentTemp() {
    return this.model.current_temperature
  }

  getMode() {
    return this.model.mode
  }

  incrementTargetTemp() {
    this.model.incrementTargetTemp()
  }

  decrementTargetTemp() {
    this.model.decrementTargetTemp()
  }

  setCurrentTemp(new_temp) {
    this.model.setCurrentTemp(new_temp)
  }

  setTargetTemp(new_temp) {
    this.model.setTargetTemp(new_temp)
  }
}

export default RadialSliderViewModel