import React, { useEffect, useState } from 'react'
import { Avatar,Input } from 'antd';
import {
  CloseOutlined
} from '@ant-design/icons';
import style from './Mine.module.scss'
import api from '@/utils/api';
import { useHistory } from 'react-router';

export default function Mine() {
  const history = useHistory()
  const [missions, setMissions] = useState([])
  const [signature, setSignature] = useState('')
  const [signatureDisplay, setSignatureDisplay] = useState(true)

  useEffect(() => {
    api.getPersonalMission({
      token:localStorage.getItem('token')
    })
    .then((res)=>{
      setMissions(res.mission)
    })
    api.getMemberInfo({
      token:localStorage.getItem('token'),
      oakCode:localStorage.getItem('oakCode')
    })
    .then(res=>{
      if(res.signature===null){}
      else{
        setSignature(res.signature)
      }
    })
  }, [])

  function commitSignatrue(event){
    api.writeMemberInfo({
      oakCode:localStorage.getItem('oakCode'),
      signature:event.target.value,
      token:localStorage.getItem('token')
    })
    .then(()=>{
      history.go(0)
    })
  }


  return (    
  <div className={style.container}>
    <div className={style.box}>
      <div className={style.header}>
        <Avatar size={100} src={localStorage.avatar}></Avatar>
        <div className={style.column}>
          <div className={style.text}> 
            {localStorage.name}
          </div>
          <div className={style.signature}
            onClick={function(){
              setSignatureDisplay(false)
            }}
            style={{display:`${signatureDisplay?'':"none"}`}}
          >
            {
              signature===""?'填写工作签名':signature
            }
          </div>
          <Input 
            style={{display:`${signatureDisplay?'none':''}`}}
            width={300}
            placeholder='按下回车以确认'
            onPressEnter={commitSignatrue}
            suffix={
              <CloseOutlined 
                onClick={
                function(){
                  setSignatureDisplay(true)
                }}
                style={{cursor:'pointer'}}
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
        {
          missions.map((item)=>{
            return <div key={item.id}>{item.name}</div>
          })
        }
      </div>
    </div>
  </div>
  )
}
