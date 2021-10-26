const tools = {
  toProgressData(raw){
    let done = raw.mission.reduce((pre,cur)=>{
      if(cur.status){
        pre =  pre+1
      }
      return pre
    },0)
    return{
      done,
      missionNumber:raw.missionNumber
    }
  }
}
export default tools