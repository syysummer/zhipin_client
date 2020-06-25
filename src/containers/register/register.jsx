/*
用户注册的路由组件
 */
import React, {Component} from 'react';
import {NavBar, List, WingBlank, WhiteSpace, Button, InputItem, Radio, Toast} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo';
import { register } from '../../redux/actions'
class Register extends Component {
  state = {
    username : '',
    password: '',
    password2: '',
    type: 'dashen'
  }
  handleChange  = (name, val) => {
    this.setState(
      {[name]: val}
    )
  }
  toLogin = () => {
    this.props.history.replace('/login')
  }
  toRegister = () => {
    const { username, password, password2 } = this.state;
    if(!username){
      Toast.info('请输入用户名！',1);
      return
    }
    if(!password){
      Toast.info('请输入密码！',1);
      return
    }
    if(!password2){
      Toast.info('请输入确认密码！',1);
      return
    }
    if(password !== password2){
      Toast.info('密码与确认密码不一致，请重新输入',1);
      return
    }
    this.props.register(this.state)
  }
  render() {
    const {redirectTo, msg} = this.props.user;
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
          <NavBar type="primary">Y&nbsp;Y&nbsp;直&nbsp;聘</NavBar>
           <Logo/>
           <WingBlank>
           {msg ? <p className='error-msg'>{msg}</p> : null}
               <List>
                <WhiteSpace/>
                <InputItem placeholder='请输入用户名' type='text' onChange = {val => {this.handleChange('username', val)}}>
                  用户名：
                </InputItem>
                <WhiteSpace/>
                <InputItem placeholder='请输入密码' type='password' onChange = {val => {this.handleChange('password', val)}}>
                  密码：
                </InputItem>
                <WhiteSpace/>
                <InputItem placeholder='请确认密码' type='password' onChange = {val => {this.handleChange('password2', val)}}>
                  确认密码：
                </InputItem>
                <WhiteSpace/>
                <List.Item>
                <span>用户类型：&nbsp;&nbsp;</span>
                <Radio checked = {this.state.type === 'dashen' }
                       onClick = {() => {this.handleChange('type', 'dashen')}}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio  checked = {this.state.type === 'laoban'}
                       onClick = {() => {this.handleChange('type', 'laoban')}}>老板</Radio>
                </List.Item>
                <Button type="primary" onClick = {this.toRegister}>注&nbsp;册</Button>
                <Button onClick = {() => {this.toLogin()}}>已有账户</Button>
               </List>
           </WingBlank>
      </div>
    )
  }
}

export default connect(
  state =>({user:state.user}),
  {register}
  )(Register)