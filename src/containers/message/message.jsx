/*
对话消息列表组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

/*
得到所有聊天的最后msg组成的数组
[msg1, msg2, msg3..]

// 1. 使用{}进行分组(chat_id), 只保存每个组最后一条msg:   {chat_id1: lastMsg1, chat_id2: lastMsg2}

// 2. 得到所有分组的lastMsg组成数组: Object.values(lastMsgsObj)  [lastMsg1, lastMsg2]

// 3. 对数组排序(create_time, 降序)
 */
function getLastMsgs(chatMsgs, userid) {
  // 1. 使用{}进行分组(chat_id), 只保存每个组最后一条msg:   {chat_id1: lastMsg1, chat_id2: lastMsg2}
  const lastMsgsObj = {}
  chatMsgs.forEach(msg => {

    msg.unReadCount = 0

    // 判断当前msg对应的lastMsg是否存在
    const chatId = msg.chat_id
    const lastMsg = lastMsgsObj[chatId]
    // 不存在
    if(!lastMsg) {
      // 将msg保存为lastMsg
      lastMsgsObj[chatId] = msg
      // 别人发给我的未读消息
      if(!msg.read && userid===msg.to) {
        // 指定msg上的未读数量为1
        msg.unReadCount = 1
      }

    } else {// 存在
      // 如果msg的创建时间晚于lastMsg的创建时间, 替换
      if (msg.create_time>lastMsg.create_time) {
        lastMsgsObj[chatId] = msg
        // 将原有保存的未读数量保存到新的lastMsg
        msg.unReadCount = lastMsg.unReadCount
      }
      // 别人发给我的未读消息
      if(!msg.read && userid===msg.to) {
        // 指定msg上的未读数量为1
        msg.unReadCount++
      }
    }
  })

  // 2. 得到所有分组的lastMsg组成数组: Object.values(lastMsgsObj)  [lastMsg1, lastMsg2]
  const lastMsgs = Object.values(lastMsgsObj)

  // 3. 对数组排序(create_time, 降序)
  lastMsgs.sort(function (msg1, msg2) {
    return msg2.create_time-msg1.create_time
  })

  return lastMsgs
}

class Message extends Component {

  render() {
    // 得到props中的user和chat
    const {user, chat} = this.props
    // 得到当前用户的id
    const meId = user._id
    // 得到所用用户的集合对象users和所有聊天的数组
    const {users, chatMsgs} = chat
    // 得到所有聊天的最后消息的数组
    const lastMsgs = getLastMsgs(chatMsgs, meId)
    return (
      <List style={{marginTop:50, marginBottom: 50}}>
        {
          lastMsgs.map(msg => {
            const targetId = msg.from === meId ? msg.to : msg.from
            const targetUser = users[targetId]
            const avatarImg = targetUser.avatar ? require(`../../assets/imgs/${targetUser.avatar}.png`) : null

            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                thumb={avatarImg}
                arrow='horizontal'
                onClick={() => this.props.history.push(`/chat/${targetId}`)}
              >
                {msg.content}
                <Brief>{targetUser.name}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    chat: state.chat
  })
)(Message)

