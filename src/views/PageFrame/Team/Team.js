import React from 'react'
import style from './Team.module.scss'
import { Avatar,Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function Team() {
  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.header}>
          <div className={style.btn}>所有成员</div>
        </div>
        <div className={style.bar}>
          <div className={style.groupName}>CV小队</div>
          <div className={style.num}>（共1人）</div>
          <div className={style.inviteBtn}>邀请新成员</div>
        </div>
        <div className={style.list}>
          <div className={style.item}>
            <Avatar className={style.icon} size={60} icon={<UserOutlined />}></Avatar>
            <div className={style.name}>臭宝</div>
            <Tag className={style.tag} color="#55acee">超级管理员
            </Tag>
          </div>
        </div>
      </div>
    </div>
  )
}
