import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  FolderAddOutlined,
  FolderOutlined
} from '@ant-design/icons';
import style from './Project.module.scss'
import NoProject from './NoProject/NoProject'
import api from '@/utils/api'
import { useHistory } from 'react-router';
export default function Project() {
  let history = useHistory()
  let selectedTeam = useSelector(state=>state.selectedTeam) 
  const [projects,setProjects] = useState([1])
  useEffect(() => {
    api.getProject({
      token:sessionStorage.getItem('token'),
      teamName:selectedTeam
    })
    .then((res)=>{
      setProjects(res.projects)
    })
  }, [selectedTeam])
  
  function toCreatProjectPage(){
    history.push('/CreateProject')
    console.log(1);
  }

  //这里是为了解决闪屏bug，当请求还没回来的时候，也就是projects仍为初始值，返回一个空div
  function renderBox(){
    if(projects[0]===1){
      return <div></div>
    }
    else if(projects.length===0){
      return <NoProject/>
    }
    else{
      return <div className={style.hasProjectBox}>
      {
      projects.map((item)=>{
        return <div className={style.projectItem}
          onClick={function(){
            history.push(`/ProjectDetail/${item.id}/${item.name}`)
          }} 
          key={item.id}
          >
          <FolderOutlined className={style.icon} />
          <div className={style.tips} >{item.name}</div>
      </div>
      })
      
      }
      <div  className={style.projectItem} onClick={toCreatProjectPage}>
          <FolderAddOutlined className={style.icon}/>
          <div className={style.tips}>创建新项目</div>
      </div>
    </div>
    }
    
  }

  return (
    <div className={style.container}>
      <div className={style.box}>
        {
          renderBox()
        }
      </div>
    </div>
  )
}
