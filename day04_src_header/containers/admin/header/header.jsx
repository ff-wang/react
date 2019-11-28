import React,{Component} from 'react'
import {Button,Icon,Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import screenfull from "screenfull"
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import {createDeleteUserInfoAction} from '../../../redux/action_creators/login_action'
import './header.less'
import {reqWeather} from '../../../api'

const { confirm } = Modal;

@connect(
  state =>({userInfo:state.userInfo}),
  {deleteUser:createDeleteUserInfoAction},
)
@withRouter
class Header extends Component{
  state = {
    isFull:false,
    data:dayjs().format('YYYY.MM.DD  HH:mm:ss'),
    weatherInfo:{}
  }
  getWeather = async()=>{
    let weather = await reqWeather()
    this.setState({weatherInfo:weather})
  }
  componentDidMount(){
    screenfull.on('change',()=>{
      let isFull = !this.state.isFull
      this.setState({isFull})
    })
    this.timer = setInterval(() => {
      this.setState({data:dayjs().format('YYYY.MM.DD  HH:mm:ss')})
    }, 1000)

    this.getWeather()
    
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  //切换全屏的回调
  screenfull = ()=>{
    screenfull.toggle()
  }
  //退出按钮
  logout = ()=>{
    confirm({
      title: '你确定要退出吗?',
      cancelText:'取消',
      okText:'确定',
      onOk:()=>{
        this.props.deleteUser()
      },
      onCancel() {},
    });
    
  }
  render(){
    let {isFull,weatherInfo} = this.state
    let {user} = this.props.userInfo
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.screenfull}>
            <Icon type={isFull?'fullscreen-exit':'fullscreen'} style={{fontSize:'20px'}}/>
          </Button>
          <span>欢迎，{user.username}</span>
          <Button type="link" onClick={this.logout}>退出</Button>
        </div>
        <div className="header-bottom">
          <div className="left"> 
            {this.props.location.pathname}
          </div>
          <div className="right">
            {this.state.data}
            <img src={weatherInfo.dayPictureUrl} alt="天气信息"/>
            {weatherInfo.weather}&nbsp;&nbsp;&nbsp;温度：{weatherInfo.temperature}
          </div>
        </div>
      </div>
    )
  }
}
export default Header
