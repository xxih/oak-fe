import { Form, Input, Button, Space, message } from 'antd';
import { useHistory} from 'react-router-dom'
import style from './Login.module.scss'
import api from '@/utils/api'
import { useDispatch } from 'react-redux';

import { switchTeamAction, switchToken } from '@/redux';
import logo from '@/assets/微信图片_20211122144258.jpg'



export default function Login() {
  // #region
  const [form] = Form.useForm()
  let history = useHistory()
  const dispatch = useDispatch()

  const onLogin = () => {
    let {oakCode,teamName,password} = form.getFieldValue()
    api.logIn({
      oakCode:parseInt(oakCode),
      teamName,
      password
    }).then((res)=>{
      let mySelf = res.member.find((item)=>{
        return item.OakCode===parseInt(oakCode)
      })
      localStorage.setItem('token',res.token)
      localStorage.setItem('oakCode',oakCode)
      localStorage.setItem('avatar',mySelf.avatar)
      localStorage.setItem('name',mySelf.name)
      localStorage.setItem('duty',mySelf.Duty)
      dispatch(switchToken(true))
      dispatch(switchTeamAction(teamName))
      history.push('/Project')
    },err=>{
      message.warning(err)
    })
  };

  const onRegister = () => {
    let { oakCode,teamName,password } = form.getFieldValue()
    api.registerTeam({
      oakCode:parseInt(oakCode),
      teamName,
      password
    })
    .then((res)=>{
      console.log(res);
      message.success(res)
    },err=>{
      console.log(err);
      message.warning(err)
    })
  };
  // #endregion
  return (
    <div className={style.page}>
      <div className={style.logo}>
        <img className={style.logoImg} src={logo} alt="" />
      </div>
      <div className={style.container}>
      <Form      
        requiredMark={false}
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
          <Input.Password onPressEnter={onLogin}/>
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
            初始化队伍
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div></div>
  )
}
