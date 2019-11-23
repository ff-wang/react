import React,{Component} from 'react'
import { Form, Icon, Input, Button,message} from 'antd';
import './css/login.less'
import logo from './imgs/logo.png'
class login extends Component{

  //点击按钮进行回调
  handleSubmit = (event) => {
   event.preventDefault();
   this.props.form.validateFields((err,values)=>{
     if (!err) {
       alert('向服务器发送请求')
     }
     else{
       message.error('您的用户名或密码输入有误，请重新输入')
     }
     
   })
  };

  //密码 自定义校验
  pwdValidator =(rule, value, callback)=>{
    console.log(value)
    if (!value) {
      callback('请输入密码')
    }else if(value.length>12){
      callback('密码长度必须小于12位')
    }else if(value.length<4){
      callback('密码长度必须大于4位')
    }else if (!(/^\w+$/).test(value)) {
      callback('密码必须包含数字，字母，下划线')
    }else{
      callback()
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo"/>
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
            {
              /*
                用户名/密码的的合法性要求
                  1). 必须输入
                  2). 必须大于等于4位
                  3). 必须小于等于12位
                  4). 必须是字母、数字、下划线组成
                */
            }
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '请输入用户名!' },
                  {max: 12, message:'用户名长度必须小于12位!' },
                  {min: 4, message:'用户名长度必须大于4位!'},
                  {pattern: /^\w+$/, message:'用户名需包含数字，字母，下划线!'}
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{validator:this.pwdValidator}],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
      </Form>
        </section>
      </div>
    )
  }
}
export default Form.create()(login);
