
// import Reactotron from 'reactotron-react-native'
const log = console.log
export default (state = {}, action) => {
  log(state)
  if (!(Number.isInteger(action.index))) {
    return state
  }
  if (state.hasOwnProperty(action.index)) {
    if (action.type == 'delete') {
      let temp = { ...state }
      delete temp[action.index]
      return { ...temp }
    }
    if(action.type=='clear'){
      return { ...state, [action.index]: {} };
    }
    if (!Number.isInteger(Number(action.type))) {
      return state
    }
    if (state[action.index].hasOwnProperty(action.type)) {
      if (action.payload == 'increment') {
        let c = {
          ...state[action.index],
          [action.type]: state[action.index][action.type] + 1
        }
        return { ...state, [action.index]: c };
      }
      else {
        if (state[action.index][action.type] == 1) {
          let temp = { ...state[action.index] }
          delete temp[action.type]
          let s = {
            ...state,
            [action.index]: { ...temp }
          }
          return { ...s }
        }
        let m = {
          ...state[action.index],
          [action.type]: state[action.index][action.type] - 1
        }
        return { ...state, [action.index]: m };
      }
    }
    else {
      let c = {
        ...state[action.index],
        [action.type]: 1
      }
      return { ...state, [action.index]: c };
    }
  }
  else {
    if (action.type == 'new') {
      log(['new', { ...state, [action.index]: {} }])
      return { ...state, [action.index]: {} };
    }
    let t = {
      [action.type]: 1
    }
    log(['old', { ...state, [action.index]: t }])
    return { ...state, [action.index]: t };
  }
}