import React, { useEffect, useState } from 'react'
import { Avatar, Input, List, Checkbox, Tag, message } from 'antd';
import {
  CloseOutlined
} from '@ant-design/icons';
import style from './Mine.module.scss'
import api from '@/utils/api';

export default function Mine() {
  const [missions, setMissions] = useState([])
  const [signature, setSignature] = useState('')
  const [signatureDisplay, setSignatureDisplay] = useState(true)

  useEffect(() => {
    api.getPersonalMission({
      token: sessionStorage.getItem('token')
    })
      .then((res) => {
        setMissions(res.mission)
      })
      .catch(err=>{
        message.error(err)
      })
    api.getMemberInfo({
      token: sessionStorage.getItem('token'),
      oakCode: sessionStorage.getItem('oakCode')
    })
      .then(res => {
        if (res.signature === null) { }
        else {
          setSignature(res.signature)
        }
      })
      .catch(err=>{
        message.error(err)
      })
  }, [])

  function commitSignatrue(event) {
    api.writeMemberInfo({
      oakCode: sessionStorage.getItem('oakCode'),
      signature: event.target.value,
      token: sessionStorage.getItem('token')
    })
      .then(() => {
        api.getMemberInfo({
          token: sessionStorage.getItem('token'),
          oakCode: sessionStorage.getItem('oakCode')
        })
          .then(res => {
            if (res.signature === null) { }
            else {
              setSignature(res.signature)
            }
          })
          .catch(err=>{
            message.error(err)
          })
      })
      .catch(err=>{
        message.error(err)
      })
  }


  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.header}>
          <Avatar size={100} src={sessionStorage.getItem('avatar')}></Avatar>
          <div className={style.column}>
            <div className={style.text}>
              {sessionStorage.name}
            </div>
            <div className={style.signature}
              onClick={function () {
                setSignatureDisplay(false)
              }}
              style={{ display: `${signatureDisplay ? '' : "none"}` }}
            >
              {
                signature === "" ? '填写工作签名' : signature
              }
            </div>
            <Input
              style={{ display: `${signatureDisplay ? 'none' : ''}` }}
              width={300}
              placeholder='按下回车以确认'
              onPressEnter={commitSignatrue}
              suffix={
                <CloseOutlined
                  onClick={
                    function () {
                      setSignatureDisplay(true)
                    }}
                  style={{ cursor: 'pointer' }}
                >
                </CloseOutlined>
              }
            >
            </Input>
          </div>
        </div>
        <div className={style.bar}>
          <div className={style.text}>任务</div>
        </div>
        <div className={style.content}>
          <List
            bordered
            dataSource={missions}
            renderItem={
              item => <List.Item className={style.missionContainer}>
                {/* <Checkbox></Checkbox> */}
                <div className={style.missionName}>{item.name}</div>
                <Tag className={style.tag}> {item.priority}</Tag>
                <Avatar className={style.avatar} size={18} src={sessionStorage.getItem('avatar')}></Avatar>
                <div className={style.name}>{sessionStorage.getItem('name')}</div>
              </List.Item>
            }
          >
          </List>
          {/* {
          missions.map((item)=>{
            return <div key={item.id}>{item.name}</div>
          })
        } */}
        </div>
      </div>
    </div>
  )
}
