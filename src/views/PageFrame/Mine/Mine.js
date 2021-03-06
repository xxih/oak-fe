import React, { useEffect, useState } from 'react'
import { Avatar, Input, List, Checkbox, Tag, Spin, message } from 'antd';
import {
  CloseOutlined
} from '@ant-design/icons';
import style from './Mine.module.scss'
import api from '@/utils/api';
import { useRef } from 'react';

export default function Mine() {
  const [spin, setSpin] = useState(true)
  const [missions, setMissions] = useState([])
  const [signature, setSignature] = useState('')
  const [signatureDisplay, setSignatureDisplay] = useState(true)
  const inputRef = useRef()
  useEffect(() => {
    Promise.all([
      api.getPersonalMission({
        token: sessionStorage.getItem('token')
      })
        .then((res) => {
          setMissions(res.mission)
        })
        .catch(err => {
          message.error(err)
        }),
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
        .catch(err => {
          message.error(err)
        })])
      .then(() => {
        setSpin(false)
      })


  }, [])

  function commitSignatrue(event) {
    api.writeMemberInfo({
      oakCode: sessionStorage.getItem('oakCode'),
      signature: event.target.value,
      token: sessionStorage.getItem('token')
    })
      .then(() => {
        setSignature(event.target.value)
        setSignatureDisplay(true)
      })
      .catch(err => {
        message.error(err)
      })
  }


  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.spinContainer} style={{display:spin?'':'none'}}>
          <Spin spinning={spin} size='large'></Spin>
        </div>
        <div className={style.header} style={{display:spin?'none':''}}>
          <Avatar size={100} src={sessionStorage.getItem('avatar')}></Avatar>
          <div className={style.column}>
            <div className={style.text}>
              {sessionStorage.name}
            </div>
            <div className={style.signature}
              onClick={function (e) {
                console.log(inputRef.current);
                inputRef.current.focus()
                setSignatureDisplay(false)
              }}
              style={{ display: `${signatureDisplay ? '' : "none"}` }}
            >
              {
                signature === "" ? '??????????????????' : signature
              }
            </div>
            <Input
              ref={inputRef}
              style={{ display: `${signatureDisplay ? 'none' : ''}` }}
              width={300}
              placeholder={'?????????????????????'}
              value={signature===''?'':signature}
              onChange={(e)=>{
                setSignature(e.target.value)
              }}
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
        <div className={style.bar} style={{display:spin?'none':''}}>
          <div className={style.text}>??????</div>
        </div>
        <div className={style.content} style={{display:spin?'none':''}}>
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
