import * as endpoints from '../endpoints'
import { AsyncStorage } from 'react-native'
import axios from 'axios'
export const getRequest = (query) => {
  return async (dispatch) => {
    dispatch({ type: endpoints.LOADING + query });
    let auth = await AsyncStorage.getItem(endpoints.AUTH)
    if (!auth)
      auth = ''
    await axios({
      url: endpoints.BASE + query,
      method: 'get',
      headers: {
        'Authorization': auth
      }
    }).then(response => {
      dispatch({
        type: query,
        payload: response.data
      })
    }
    ).catch((e) => {
      dispatch({ type: endpoints.FAIL + query })
    });
  }
}