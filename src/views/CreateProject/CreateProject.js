import React from 'react'
import { Layout, Button, Input, Form } from 'antd';
import style from './CreateProject.module.scss'
import {  CompressOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import api from '@/utils/api'


export default function CreateProject() {
  let history = useHistory()
  let selectedTeam = useSelector(state=>state.selectedTeam)
  const [form] = Form.useForm()

  function createProject(){
    let {projectName} = form.getFieldValue()
    let result = api.createProject({
      oakCode:sessionStorage.getItem('oakCode'),
      teamName:selectedTeam,
      token:sessionStorage.getItem('token'),
      projectName:projectName
    })
    result.then((res)=>{
      console.log(res);
      history.push('/Project')
    })
  }
  function back(){
    history.goBack()
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
              添加项目详情
            </div>
            <div className={style.littleTitle}>
              项目名称
            </div>
            <Form form={form}>
              <Form.Item 
                name="projectName"
                rules={[{required:true}]}
                
              >
                <Input style={{marginTop:"20px",width:340}} />
              </Form.Item>
            </Form>
            <Button className={style.btn} 
            type="primary"
            onClick={createProject}
            >
              创建项目
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  )
}
