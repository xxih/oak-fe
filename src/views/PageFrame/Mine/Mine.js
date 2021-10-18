import React, { useEffect, useState } from 'react'
import { Avatar } from 'antd';
import style from './Mine.module.scss'
import api from '@/utils/api';

export default function Mine() {
  const [missions, setMissions] = useState([])
  useEffect(() => {
    api.getPersonalMission({token:localStorage.getItem('token')})
    .then((res)=>{
      setMissions(res.mission)
    })
  }, [])
  return (    
  <div className={style.container}>
    <div className={style.box}>
      <div className={style.header}>
        <Avatar size={100} src={localStorage.avatar}></Avatar>
        <div className={style.column}>
          <div className={style.text}>{localStorage.name}</div>
        </div>
      </div>
      <div className={style.bar}>
        <div className={style.text}>任务</div>
      </div>
      <div className={style.content}>
        {
          missions.map((item)=>{
            return <div>{item.name}</div>
          })
        }
      </div>
    </div>
  </div>
  )
}
