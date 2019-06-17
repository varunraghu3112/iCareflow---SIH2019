// import Reactotron from 'reactotron-react-native'

export const LOG = __DEV__ ? console.log : console.log

export const BASE = 'https://angadi.kctyugam.com/api/'
export const AUTH = 'auth'
export const DATA = 'data'
export const PROFILE_DATA = 'profile'

export const EXTERNAL_BILLING = 'external_payment_gateway/'
export const PRODUCT_LIST = 'products/'
export const USER_INFO ='get_user_info/'

export const LOADING = 'loading'
export const FAIL = 'error'
export const CLEAR = 'clear'

export const LOGGEDIN = 'loggedin'
export const LOGGEDOFF = 'loggedoff'

export const USERDATA = 'userdata'

export const LOGIN = 'v1/login_api/'
export const LOGOUT = 'logout'

export const DEIVERY_LIST = 'v1/delivery_list/'

export const PDT_DELIVERY = 'v1/product_delivery/'


export const apis = [
  {
    name: 'products',
    query: PRODUCT_LIST,
    init: { response: [], loading: false }
  },
  {
    name: 'externalBilling',
    query: EXTERNAL_BILLING,
    init: { response: {}, loading: false }
  },
  {
    name: 'userInfo',
    query: USER_INFO,
    init: { response: {}, loading: false }
  },
  {
    name: 'login',
    query: LOGIN,
    init: { response: {}, loading: false }
  },
  {
    name: 'logout',
    query: LOGOUT,
    init: { response: {}, loading: false }
  },
  {
    name: 'deliveryList',
    query:DEIVERY_LIST,
    init: { response:[], loading: false}
  },
  {
    name: 'productDelivery',
    query: PDT_DELIVERY,
    init : {response: {}, loading: false}
  }
]
