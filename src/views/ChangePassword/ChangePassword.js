import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Input, Form, message} from 'antd';
import {  CompressOutlined } from '@ant-design/icons';

import style from './ChangePassword.module.scss'
import api from '@/utils/api'


export default function ChangePassword() {
  let navigate = useNavigate()
  const [form] = Form.useForm()

  function changePassword(){
    let {oldPassword,newPassword} = form.getFieldValue()
    api.updatePassword({
      oakCode:sessionStorage.getItem('oakCode'),
      oldPassword,
      newPassword
    })
    .then(()=>{
      message.success('修改成功！三秒后回到登录界面...');
      setTimeout(()=>{
        navigate('/Login')
      },3000 )
    })
  }
  function back(){
    navigate(-1)
  }
  return (
    <div>
      <Layout className={style.layout}> 
        <div className={style.header}>
          {/* <ArrowLeftOutlined className={style.backButton} onClick={back}></ArrowLeftOutlined> */}
          <div className={style.btnContainer}>
            <CompressOutlined className={style.closeButton} onClick={back}></CompressOutlined>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.container}>
            <div className={style.title}>
              修改密码
            </div>
            <Form form={form} className={style.form}>
              <Form.Item 
                label="原密码"
                name="oldPassword"
                rules={[{required:true}]}
              >
                <Input.Password style={{width:340}} />
              </Form.Item>
              <Form.Item 
                label="新密码"
                name="newPassword"
                rules={[{required:true}]}
              >
                <Input.Password style={{width:340}} />
              </Form.Item>
            </Form>
            <Button className={style.btn} 
            type="primary"
            onClick={changePassword}
            >
              修改密码
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  )
}
