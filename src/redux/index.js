
const SWITCH_TEAM = 'SWITCH_TEAM'
const SWITCH_TOKEN = 'SWITCH_TOKEN'

//actions创建函数
export function switchTeamAction(str){
  return{
    type:SWITCH_TEAM,
    teamName:str
  }
}
export function switchToken(token){
  return{
    type:SWITCH_TOKEN,
    token
  }
}

//初始值 是一个对象，可以包含多值
const initialState = {
  selectedTeam:'',
  token:false
}

export function reducer(state = initialState, action){
  switch(action.type){
    case SWITCH_TEAM:
      return {...state,selectedTeam:action.teamName}
    case SWITCH_TOKEN:
      return {...state,token:action.token}
    default:
      return state
  }
}