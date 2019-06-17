import * as endpoints from '../endpoints'
import { AsyncStorage } from 'react-native'
import { isLogged } from './'
import base64 from 'base-64';
import axios from 'axios'

export const loginRequest = (query, payload) => {
  return async (dispatch) => {
    dispatch({ type: endpoints.LOADING + query });
    await axios({
      url: endpoints.BASE + query,
      method: 'post',
      headers:{
        'Authorization':'Basic c3JpbmF0aDppUXViZUAyMDE4'
      },
      data: { ...payload }
    }).then(async (response) => {
      let text = await payload.username + ':' + payload.password;
      let encoded = await base64.encode(text);
      let auth = await 'Basic ' + encoded;
      await AsyncStorage.setItem(endpoints.AUTH, auth);
      await AsyncStorage.setItem(endpoints.DATA, JSON.stringify(response.data))
      dispatch({
        type: query,
        payload: response.data
      })
      dispatch(isLogged())
    }
    ).catch((e) => {
      dispatch({
        type: query,
        payload: e.response.data
      })
    });
  }
}