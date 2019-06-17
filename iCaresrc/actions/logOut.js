import { AsyncStorage } from 'react-native'
import * as endpoints  from '../endpoints'
import {isLogged} from './'

export const logOut = () => {
  return async (dispatch) => {
      dispatch({ type: endpoints.LOADING + endpoints.LOGOUT })
      await AsyncStorage.removeItem(endpoints.DATA);
      await AsyncStorage.removeItem(endpoints.AUTH);
      dispatch(isLogged())
    dispatch({ type: endpoints.FAIL + endpoints.LOGOUT })
  }
}