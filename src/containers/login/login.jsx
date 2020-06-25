/*
用户登陆的路由组件
 */
import React, {Component} from 'react';
import {NavBar, List, WingBlank, WhiteSpace, Button, InputItem, Toast} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo';
import {login} from '../../redux/actions';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  toRegister = () => {
    this.props.history.replace('/register');
  }
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  toLogin = () => {
    const { username, password } = this.state;
    if(!username){
      Toast.info('请输入用户名！',1);
      return
    }
    if(!password){
      Toast.info('请输入密码！',1);
      return
    }
    this.props.login(this.state)
  }
  render () {
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
                <Button type="primary" onClick = {this.toLogin}>登&nbsp;录</Button>
                <Button onClick = {this.toRegister}>还没有账户</Button>
               </List>
           </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
  {login}
)(Login)