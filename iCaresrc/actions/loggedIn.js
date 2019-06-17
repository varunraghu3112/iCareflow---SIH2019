import { AsyncStorage } from 'react-native'
import * as endpoints from '../endpoints'
export const isLogged = () => {
  return async (dispatch) => {
    let data = {};
    dispatch({
      type: endpoints.LOADING + endpoints.USERDATA
    })
    await AsyncStorage.getItem(endpoints.DATA).then(res => {
      data = JSON.parse(res)
    }).catch(() => data = null)
    endpoints.LOG(['data',data])
    if (data) {
      dispatch({
        type: endpoints.LOGGEDIN
      })
      dispatch({
        type: endpoints.USERDATA,
        payload: { ...data } 
      })
    }
    else {
      dispatch({
        type: endpoints.LOGGEDOFF
      })
      dispatch({
        type: endpoints.USERDATA,
        payload: {} 
      })
    }
  }
}