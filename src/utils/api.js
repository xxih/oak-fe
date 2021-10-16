import axios from './http'

const api = {
  async logIn(params){
    let result = axios.get('/logIn/',{params:params})
    return result.then(res=>{
      switch (res.data.response) {
        case 1:
          return Promise.resolve(res.data)
        case 2:
          return Promise.reject("oakCode不存在或密码错误")
        case 3:
          return Promise.reject("队名错误")
        default:
      }
    })
  },
  async registerTeam(params){
    let result = axios.post('/registerTeam/',params)
    return result.then(res=>{
      if(res.data.response===1){
        return Promise.resolve(res.data)
      }
      else if(res.data.response===2){
        return Promise.reject('oakCode不存在或者密码错误')
      }
      else if(res.data.response===3){
        return Promise.reject('队名重复或不合法')
      }
    })
  },
  async getTeam(params){
    return axios.get('/getTeam/',{
      params:params
    })
    .then((res)=>{
      if(res.data.response===0){
        return Promise.reject('token错误')
      }
      return Promise.resolve(res.data)
    })
  },
  async createProject(params){
    return axios.post('/createProject/',params)
    .then((res)=>{
      if(res.data.response===1){
        return Promise.resolve(res.data)
      }
      else{
        return Promise.reject('失败了')
      }
    })
  },
  async getProject(params){
    return axios.get('/getProject/',{params})
    .then(res=>{
      return Promise.resolve(res.data)
    })
  },
  async getMembers(params){
    return axios.get('/getMembers/',{params})
    .then(res=>{
      return Promise.resolve(res.data)
    })
  },
  async createMission(params){
    return axios.post('/createMission/',params)
    .then((res)=>{
      return Promise.resolve(res.data)
    })
  }
}

export default api