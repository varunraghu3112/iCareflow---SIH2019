import * as endpoints from '../endpoints'
export const clearData = (query) => ({
  type: endpoints.CLEAR + query
})