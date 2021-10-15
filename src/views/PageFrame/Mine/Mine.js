import React from 'react'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import style from './Mine.module.scss'

export default function Mine() {
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
      <div className={style.content}>content</div>
    </div>
  </div>
  )
}
