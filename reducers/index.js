import { combineReducers } from 'redux';
import reducer from './createReducer'
import logged from './loggedIn'
import userData from './userData'
import {apis} from '../'
import answers from './answers'

let queryReducers = {};

apis.forEach((val) => {
  queryReducers[val.name] = reducer({...val.init}, val.query)
})

export default combineReducers({
  ...queryReducers,
  logged,
  userData,
  answers
});
