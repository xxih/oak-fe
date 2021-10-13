import axios from './http'

const api = {
  logIn(params){
    return axios.get('/logIn/',{
      params:params
    })
  },
  registerTeam(params){
    return axios.post('/registerTeam/',params)
  },
  getTeam(params){
    return axios.get('/getTeam/',{
      params:params
    })
  },
  
}
export default api