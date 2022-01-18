import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import style from './Notice.module.scss'
import { Button, Modal,Form,Input, message } from 'antd';

import api from '@/utils/api'
import { useForm } from 'antd/lib/form/Form';

export default function Notice() {  
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const {id, name} = useParams()
  const [notice, setNotice] = useState('')
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    api.getNotice({
      projectID:id,
      token:sessionStorage.getItem('token')
    })
    .then((res)=>{
      console.log(res);
      if(res.content){
        setNotice(res.content)
      }
    })
    .catch(err=>{
      message.error(err)
    })
  }, [])  
  
  function commitNotice(){
    api.writeNotice({
      content:form.getFieldValue().content,
      user_OakCode:sessionStorage.getItem('oakCode'),
      projectID:id,
      token:sessionStorage.getItem('token')
    })
    .then(()=>{
      navigate(0)
    })
    .catch(err=>{
      message.error(err)
    })
  }

  function openModal(){
    setVisible(true)
  }


  function closeModal(){
    setVisible(false)
  }
  
  return (
    <div>
      <div className={style.noticeContainer}>
        <div className={style.notice}>
          {notice}
        </div>
        <Button 
          className={style.btn}
          onClick={openModal}
        >修改</Button>
      </div>
      <Modal 
        visible={visible}
        onOk={commitNotice}
        onCancel={closeModal}
        className={style.modal}
        width={400}
      >

        <div className={style.modalTitle}>
          修改公告
        </div>
        <Form
          labelCol={{span:7}}
          wrapperCol={{span:13}}
          className={style.form}
          form={form}
          requiredMark={false}
        >
          <Form.Item
            label="公告内容"
            name="content"
            rules={[{required:true}]}
          >
            <Input.TextArea></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
