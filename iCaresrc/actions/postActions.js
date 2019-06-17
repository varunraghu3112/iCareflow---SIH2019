import * as endpoints from '../endpoints'
import axios from 'axios'
import { AsyncStorage } from 'react-native'

export const postRequest = (query, payload) => {
  return async (dispatch) => {
    dispatch({ type: endpoints.LOADING + query });
    let auth = await AsyncStorage.getItem(endpoints.AUTH)
    if (!auth)
      auth = ''
    await axios({
      url: endpoints.BASE + query,
      method: 'post',
      headers: {
        'Authorization': auth
      },
      data: { ...payload }
    }).then(response => {
      dispatch({
        type: query,
        payload: response.data
      })
    }
    ).catch(() => dispatch({ type: endpoints.FAIL + query }));
  }
}