/*
用户个人中心路由组件
 */

import React from 'react';
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile';
import Cookies from 'js-cookie';
import {connect} from "react-redux";

import { resetUser } from '../../redux/actions';

const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {
  handleLogout = () => {
    Modal.alert('退出', '确认退出登录吗?', [
      {
        text: '取消',
        onPress: () => console.log('cancel')
},
      {
        text: '确认',
        onPress: () => {
          // 清除cookie中的userid
          Cookies.remove('userid')
          // 重置redux中的user状态
          this.props.resetUser()
        }
      }
    ])
  } 
  render() {
    const user = this.props.user;
    return (
      <div className='concent-wrap'>
        <Result
          img={<img src={require(`../../assets/imgs/头像1.png`)} style={{width: 50}} alt="header"/>}
          title={user.username}
          message={user.company ? user.company : ''}
        />

        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位: {user.post}</Brief>
            <Brief>简介: {user.info}</Brief>
            {user.salary ? <Brief>薪资: {user.salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.handleLogout}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)