import { USERDATA ,LOADING } from '../endpoints'
export default (state = { response:{},loading:false }, action) => {
  if(action.type==LOADING+USERDATA){
    return { response:{},loading:true}
  }
  if (action.type == USERDATA) {
    return { response: { ...action.payload }, loading: false}
  }
  else {
    return {...state};
  }
}
