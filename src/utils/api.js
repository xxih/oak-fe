
import axios from './http'

const api = {
  async logIn(params){
    let result = axios.get('/logIn/',{params:params})
    return result.then(res=>{
      switch (res.data.response) {
        case 1:
          return res.data
        case 2:
          return Promise.reject("oakCode不存在或密码错误")
        case 3:
          return Promise.reject("队名错误,第一次使用oak需要创建队伍哦~")
        default:
          return 
      }
    })
  },
  async registerTeam(params){
    return axios.post('/registerTeam/',params)
    .then(res=>{
      console.log(1);
      console.log(res);
      if(res.data.response===1){
        return Promise.resolve('创建成功!现在您可以登录啦!')
      }
      else if(res.data.response===2){
        return Promise.reject('oakCode不存在或者密码错误')
      }
      else if(res.data.response===3){
        return Promise.reject('队名重复或不合法哦，再选一个队名吧~')
      }
      else return
    },err=>{
      console.log(err);
      return err
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
      return res.data
    })
  },
  async createProject(params){
    return axios.post('/createProject/',params)
    .then((res)=>{
      if(res.data.response===1){
        return res.data
      }
      else{
        return Promise.reject('失败了')
      }
    })
  },
  async getProject(params){
    return axios.get('/getProject/',{params})
    .then(res=>{
      return res.data
    })
  },
  async getMembers(params){
    return axios.get('/getMembers/',{params})
    .then(res=>{
      return res.data
    })
  },
  async createMission(params){
    return axios.post('/createMission/',params)
    .then((res)=>{
      return res.data
    })
  },
  async getMission(params){
    return axios.get('/getMission/',{params})
    .then((res)=>{
      return res.data
    })
  },
  async inviteMember(params){
    return axios.post('/inviteMember/',params)
    .then((res)=>{
      return res.data
    })
  },
  async getPersonalMission(params){
    return axios.get('/getPersonalMission/',{params})
    .then((res)=>{
      return res.data
    })
  },
  async getNotice(params){
    return axios.get('/getNotice/',{params})
    .then((res)=>{
      return res.data
    })
  },
  async writeNotice(params){
    return axios.post('/writeNotice/',params)
    .then((res)=>{
      return res.data
    })
  },
  async createTeam(params){
    return axios.post('/createTeam/',params)
    .then((res)=>{
      return res.data
    })
  },
  async getMemberInfo(params){
    return axios.get('/getMemberInfo/',{params})
    .then((res)=>{
      return res.data
    })
  },
  async writeMemberInfo(params){
    return axios.post('/writeMemberInfo/',params)
    .then((res)=>{
      return res.data
    })
  },
  async getAllMission(params){
    return axios.get('/getAllMission/',{params})
    .then(res=>{
      return res.data
    })
  },
  async switchMissionStatus(params){
    return axios.post('/switchMissionStatus/',params)
    .then(res=>{
      return res.data
    })
  },
  async getMissionDetail(params){
    return axios.get('/getMissionDetail/',{params})
    .then(res=>{
      return res.data
    })
  },
  async updatePassword(params){
    return axios.post('/updatePassword/',params)
    .then(res=>{
      return res.data
    })
  },
  async deleteMission(params){
    return axios.post('/deleteMission/',params)
    .then(res=>{
      return res.data
    })
  },
  async deleteProject(params){
    return axios.post('/deleteProject/',params)
    .then(res=>{
      return res.data
    })
  },
  async updateMission(params){
    return axios.post('/updateMission/', params)
    .then((res)=>{
      return res.data
    })
  }

}

export default api