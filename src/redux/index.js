const { createStore } = require("redux")

const SWITCH_TEAM = 'SWITCH_TEAM'

//actions创建函数
export function switchTeamAction(str){
  return{
    type:SWITCH_TEAM,
    teamName:str
  }
}

//初始值 是一个对象，可以包含多值
export const initialState = {
  selectedTeam:''
}

export function reducer(state = initialState, action){
  switch(action.type){
    case SWITCH_TEAM:
      return {...state,selectedTeam:action.teamName}
    default:
      return state
  }
}