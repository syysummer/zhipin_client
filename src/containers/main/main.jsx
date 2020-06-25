/*
应用主界面路由组件
 */
 import React, {Component} from 'react';
import {Redirect,Switch, Route} from "react-router-dom";
import {NavBar} from "antd-mobile";
import {connect} from "react-redux";
import Cookie from "js-cookie";

import { getUser } from '../../redux/actions';
import {getRedirectTo} from "../../utils";

import LaoBanInfo from "../lanban-info/laoban-info";
import DaShenInfo from "../dashen-info/dashen-info";
import LaoBan from '../laoban/laoban';
import DaShen from '../dashen/dashen';
import Message from '../message/message';
import Personal from '../personal/personal';
import NotFound from '../../components/not-found/not-found';
import NavFooter from '../../components/nav-footer/nav-footer';
import Chat from '../chat/chat';


 class Main extends Component{
   // 给组件对象添加属性
  navList = [
    {
      path: '/laoban', // 路由路径
      component: LaoBan,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: DaShen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]
  
  componentDidMount() {
    // cookie中有userid
    // redux中的user是空对象
    const userid = Cookie.get('userid')
    const {user} = this.props
    if (userid && !user._id) {
      this.props.getUser()  // 获取user并保存到redux中
    }
  }
    render () {
    // 得到当前请求的path
    let path = this.props.location.pathname;
    // 判断用户是否已登陆(过)(cookie中userid是否有值)
    const userid = Cookie.get('userid')
    if (!userid) { // 如果没值, 自动跳转到登陆界面
      return <Redirect to='/login'/>
    }
    // cookie中有userid
    // redux中的user是否有数据
    const {user} = this.props
    if (!user._id) {
      return null  // 不做任何显示
    }
    //用于确定当前是哪个路由,进行对应的显示
    let currentNav = this.navList.find((nav,index) => nav.path === path );
    if(path === "/" || (path === '/laobaninfo' && user.header) || (path === '/dasheninfo' && user.header)){
      return <Redirect to={getRedirectTo(user.type,user.header)}/>
    }
    let navList = this.navList;
    if(user.type === "dashen"){
        navList[1].hide = false;
        navList[0].hide = true;
    }else{
        navList[0].hide = false;
        navList[1].hide = true;
    }
     return (
          <div>
           {currentNav ? <NavBar className='stick-top fix-top'>{currentNav.title}</NavBar> : null}
            <Switch>
              <Route path='/laobaninfo' component={LaoBanInfo}/>
              <Route path='/dasheninfo' component={DaShenInfo} />
              <Route path='/laoban' component={LaoBan}/>
              <Route path='/dashen' component={DaShen} />
              <Route path='/message' component={Message}/>
              <Route path='/personal' component={Personal} />
              <Route path='/chat/:userid' component={Chat}></Route>
              <Route component={NotFound}/>
            </Switch>
            {currentNav ? <NavFooter unReadCount={this.props.unReadCount} navList={this.navList}/> : null}
          </div>
        )
      }
 }
 
 export default connect(
  state => ({user:state.user,unReadCount:state.chat.unReadCount}),
  {getUser}
 )(Main)