/*
包含n个根据老的state和action返回新的state的函数的模块
 */
import {combineReducers} from 'redux';
import { getRedirectTo } from '../utils';

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
} from './action-types'

const initUser = {
  username: '', // 用户名
  type: '', // 类型
  msg: '', // 错误提示信息
  redirectTo: '' // 需要自动跳转的路由path
}
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: // 认证成功
      return {...action.data, redirectTo: getRedirectTo(action.data.type, action.data.header)}
    case ERROR_MSG: // 错误信息提示
      return {...state, msg: action.data}
    case RECEIVE_USER: // 接收用户
      return action.data
    case RESET_USER: // 重置用户
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

const initUserList = []

function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

// 初始chat对象
const initChat = {
  chatMsgs: [],  // 消息数组 [{from: id1, to: id2}{}]
  users: {},  // 所有用户的集合对象{id1: user1, id2: user2}
  unReadCount: 0 // 未读消息的数量
}
// 管理聊天相关信息数据的reducer
function chat(state=initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG:
      var {chatMsg, userid} = action.data
      return {
        chatMsgs: [...state.chatMsgs, chatMsg],
        users: state.users,
        unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to===userid ? 1 : 0)
      }
    case RECEIVE_MSG_LIST:
      var {chatMsgs, users, userid} = action.data
      return {
        chatMsgs,
        users,
        unReadCount: chatMsgs.reduce((preTotal, msg) => { // 别人发给我的未读消息
          return preTotal + (!msg.read&&msg.to===userid ? 1 : 0)
        }, 0)
      }
    case MSG_READ:
      const {count, from, to} = action.data

      return {
        chatMsgs: state.chatMsgs.map(msg => {
          if(msg.from===from && msg.to===to && !msg.read) {
            // msg.read = true  // 不能直接修改状态
            return {...msg, read: true}
          } else {
            return msg
          }
        }),
        users: state.users,
        unReadCount: state.unReadCount-count
      }
    default:
      return state
  }
}
// 返回合并的reducer
export default combineReducers({
  user,
  userList,
  chat
})