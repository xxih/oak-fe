import React from 'react'
import { Layout, Button, Input, Form,message } from 'antd';
import style from './CreateTeam.module.scss'
import {  CompressOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import api from '@/utils/api'


export default function CreateTeam() {
  const history = useHistory()
  const [form] = Form.useForm()
  function goBack(){
    history.go(-1)
  }  
  function createTeam(){
    let {teamName} = form.getFieldValue()
    api.createTeam({
      oakCode:sessionStorage.getItem('oakCode'),
      teamName,
      token:sessionStorage.getItem('token')
    })
    .then(()=>{
      history.go(-1)
    })
    .catch(err=>{
      message.error(err)
    })
  }
  return (    
  <div>
    <Layout className={style.layout}> 
      <div className={style.header}>
        <div className={style.btnContainer}>
          <CompressOutlined className={style.closeButton} onClick={goBack}></CompressOutlined>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.container}>
          <div className={style.title}>
            新建团队详情
          </div>
          <div className={style.littleTitle}>
            团队名称
          </div>
          <Form form={form}>
            <Form.Item 
              name="teamName"
              rules={[{required:true}]}
              
            >
              <Input style={{marginTop:"20px",width:340}} />
            </Form.Item>
          </Form>
          <Button className={style.btn} 
          type="primary"
          onClick={createTeam}
          >
            创建团队
          </Button>
        </div>
      </div>
    </Layout>
  </div>
  )
}
