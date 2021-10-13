import { Form, Input, Button, Space } from 'antd';
import { useHistory, useLocation } from 'react-router-dom'
import style from './Login.module.scss'
import api from '@/utils/api'

export default function Login() {
  const [form] = Form.useForm()
  let history = useHistory()
  let location = useLocation()

  const onLogin = () => {
    let {oakCode,teamName,password} = form.getFieldValue()
    let res = api.logIn({
      oakCode:parseInt(oakCode),
      teamName,
      password
    })
    res.then((res)=>{
      console.log(res);
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('token',res.data.token)
    })
    .then(()=>{
      // history.push('/Project')
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const onRegister = () => {
    let { oakCode,teamName,password } = form.getFieldValue()
    let res = api.registerTeam({
      oakCode:parseInt(oakCode),
      teamName,
      password
    })
    res.then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  };
  return (
    <div className={style.page}>
      <div className={style.logo}>
        OAK管理系统
      </div>
      <div className={style.container}>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 7
        }}
        wrapperCol={{
          span: 30,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="小组名称"
          name="teamName"
          rules={[
            {
              required: true,
              message: '请输入您的小组名',
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="橡木码"
          name="oakCode"
          rules={[
            {
              required: true,
              message: '请输入您的橡木码',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入您的密码',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 7,
            span: 30,
          }}
        >
          <Space>
            <Button type="primary" htmlType="button"
            onClick={onLogin}>
            登录
            </Button>
            <Button type="primary" htmlType="button"
            onClick={onRegister}>
            注册
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div></div>
  )
}
