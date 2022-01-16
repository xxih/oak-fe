import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import style from './Notice.module.scss'
import { Button, Modal,Form,Input } from 'antd';

import api from '@/utils/api'
import { useForm } from 'antd/lib/form/Form';

export default function Notice() {  
  const history = useHistory()
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
      setNotice(res.content)
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
      history.go(0)
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
