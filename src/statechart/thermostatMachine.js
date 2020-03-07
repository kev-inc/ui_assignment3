import { Machine } from 'xstate'
import Thermostat from '../model/Thermostat.model'

const changeTemp = {
  id: 'changeTemp',
  initial: 'armed',
  states:{
    armed: {
      on: {
        CLOCKWISE: 'increment_check',
        ANITCLOCKWISE: 'decrement_check'
      }
    },
    increment_check: {
      on: {
        pass: 'increment_update',
        fail: 'armed'
      }
    },
    decrement_check: {
      on: {
        pass: 'decrement_update',
        fail: 'armed'
      }
    },
    increment_update: {
      on: {
        add: 'armed'
      }
    }, 
    decrement_update: {
      on: {
        minus: 'armed'
      }
    }
  },
  on: {
    mouseUp: 'modes.hist'
  }
}

const modes = {
  id: 'modes',
  initial: 'off',
  states: {
    off: {
      on: {
        TOO_HOT: 'cooling',
        TOO_COLD: 'heating'
      }
    },
    heating: {
      on: {
        OK: 'off',
        TOO_HOT: 'cooling'
      }
    },
    cooling: {
      on: {
        OK: 'off',
        TOO_COLD: 'heating'
      }
    }, 
    hist: { type: 'history' }
  },
  on: {
    mouseDown: 'changeTemp'
  }
}

const thermostat = {
  id: 'thermostat',
  context: {
    model: new Thermostat(72, 72, 2, 1.5, 1)
  },
  initial: 'modes',
  states: {
    modes: modes,
    changeTemp: changeTemp
  }
}




export const thermostatMachine = Machine(thermostat);
