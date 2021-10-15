import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  FolderAddOutlined,
  FolderOutlined
} from '@ant-design/icons';
import style from './Project.module.scss'
import NoProject from './NoProject'
import api from '@/utils/api'
import { useHistory } from 'react-router';
export default function Project() {
  let history = useHistory()
  let selectedTeam = useSelector(state=>state.selectedTeam) 
  const [projects,setProjects] = useState([])
  useEffect(() => {
    api.getProject({
      token:localStorage.getItem('token'),
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

  return (
    <div className={style.container}>
      <div className={style.box}>
        {
          projects.length===0?<NoProject/>:
          <div className={style.hasBox}>
            {
            projects.map((item)=>{
              return <div className={style.projectItem}>
                <FolderOutlined className={style.icon}/>
                <div className={style.tips}>{item.name}</div>
            </div>
            })
            
            }
            <div  className={style.projectItem} onClick={toCreatProjectPage}>
                <FolderAddOutlined className={style.icon}/>
                <div className={style.tips}>创建新项目</div>
            </div>
          </div>
          
        }
      </div>
    </div>
  )
}
