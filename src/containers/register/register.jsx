/*
用户注册的路由组件
 */
import React, {Component} from 'react';
import {NavBar, List, WingBlank, WhiteSpace, Button, InputItem, Radio} from 'antd-mobile';

import Logo from '../../components/logo/logo';

export default class Register extends Component {
  render() {
    return (
      <div>
          <NavBar type="primary">用户注册</NavBar>
           <Logo/>
           <WingBlank>
               <List>
                <WhiteSpace/>
                <InputItem placeholder='请输入用户名'>
                  用户名：
                </InputItem>
                <WhiteSpace/>
                <InputItem placeholder='请输入密码' type='password'>
                  密码：
                </InputItem>
                <WhiteSpace/>
                <InputItem placeholder='请确认密码' type='password'>
                  确认密码：
                </InputItem>
                <WhiteSpace/>
                <List.Item>
                <span>用户类型：&nbsp;&nbsp;</span>
                <Radio>大神</Radio>
                <Radio>老板</Radio>
                </List.Item>
                <Button type="primary">注&nbsp;册</Button>
                <Button>已有账户</Button>
               </List>
           </WingBlank>
      </div>
    )
  }
}