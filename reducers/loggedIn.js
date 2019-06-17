import {LOGGEDIN,LOGGEDOFF} from '../endpoints'
export default (state = {loggedIn:false}, action) => {
  if (action.type == LOGGEDIN) {
    return { loggedIn:true}
  }
  else if (action.type == LOGGEDOFF) {
    return { loggedIn:false}
  }
  else {
    return state;
  }
}
