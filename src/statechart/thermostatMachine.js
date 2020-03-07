import { Machine, assign } from 'xstate'

const addTarget = assign({
  target: (context, event) => context.target + 1
})

const minusTarget = assign({
  target: (context, event) => context.target - 1
})

const setCurrent = assign({
  current: (context, event) => event.currentTemp
})

const setTarget = assign({
  target: (context, event) => event.targetTemp
})

function moreThan80(context, event) {
  return context.target >= 80;
}

function lessThan80(context, event) {
  return context.target < 80;
}

function moreThan50(context, event) {
  return context.target > 50;
}

function lessThan50(context, event) {
  return context.target <= 50;
}

function enableHeating(context, event) {
  const {target, current, dT, dTheat} = context
  return current < target - dT - dTheat
}

function enableCooling(context, event) {
  const {target, current, dT, dTcool} = context
  return current > target + dT + dTcool
}

function disableAll(context, event) {
  const {target, current, dT, dTheat, dTcool} = context
  return ((current > target - (dT - dTheat)) && (current < target + (dT - dTcool)))
}

const changeTemp = {
  id: 'changeTemp',
  initial: 'armed',
  states: {
    armed: {
      on: {
        CLOCKWISE: 'increment_check',
        ANTICLOCKWISE: 'decrement_check'
      },
    },
    increment_check: {
      on: {
        '': [{
          target: 'increment_update',
          cond: 'lessThan80'
        }, {
          target: 'armed',
          cond: 'moreThan80'
        }]
      }
    },
    decrement_check: {
      on: {
        '': [{
          target: 'decrement_update',
          cond: 'moreThan50'
        }, {
          target: 'armed',
          cond: 'lessThan50'
        }]
      }
    },
    increment_update: {
      on: {
        '': {
          target:'armed',
          actions: 'addTarget'
        }
      }
    }, 
    decrement_update: {
      on: {
        '': {
          target:'armed',
          actions: 'minusTarget'
        }
      }
    }
  }
}

const modes = {
  id: 'modes',
  initial: 'off',
  states: {
    off: {
      on: {
        '': [{
          target: 'heating',
          cond: 'enableHeating'
        }, {
          target: 'cooling',
          cond: 'enableCooling'
        }]
      }
    },
    heating: {
      on: {
        '': [{
          target: 'off',
          cond: 'disableAll'
        }, {
          target: 'cooling',
          cond: 'enableCooling'
        }]
      }
    },
    cooling: {
      on: {
        '': [{
          target: 'off',
          cond: 'disableAll'
        }, {
          target: 'heating',
          cond: 'enableHeating'
        }]
      }
    }
  }
}

const thermostat = {
  id: 'thermostat',
  type:'parallel',
  context: {
    target: 72,
    current: 72,
    dT: 2,
    dTcool: 1.5,
    dTheat: 1
  },
  initial: 'modes',
  states: {
    modes: modes,
    changeTemp: changeTemp,
    setTemp: {
      on: {
        setCurrent: {
          actions: 'setCurrent'
        },
        setTarget: {
          actions: 'setTarget'
        }
      }
    }
  }
}

export const ThermostatMachine = Machine(thermostat, {
  actions: { addTarget, minusTarget, setCurrent, setTarget},
  guards: {moreThan80, lessThan80, moreThan50, lessThan50, enableHeating, enableCooling, disableAll}
});
