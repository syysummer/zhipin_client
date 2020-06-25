import React, {Component} from 'react';
import { connect } from 'react-redux';
import {NavBar, WingBlank, InputItem, List, Button, TextareaItem} from 'antd-mobile';

import HeaderSelector from '../../components/header-selector/header-selector'
import { updateUser } from '../../redux/actions';
 
class DashenInfo extends Component{
  state = {
    header: "",
    info:"",
    post:""
  };
  setHeader = (header) => {
    this.setState({header})
  }
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  save = () => {
    this.props.updateUser(this.state)
  }
  render(){
    return (
        <div>
            <NavBar>大&nbsp;神&nbsp;信&nbsp;息&nbsp;完&nbsp;善</NavBar>
            <HeaderSelector setHeader={this.setHeader}/>
            <WingBlank/>
            <List>
                <InputItem placeholder='请输入求职岗位'  onChange={val => {this.handleChange('post',val)}} >求职岗位:</InputItem>
                <TextareaItem title='个人介绍:' rows={3}  onChange={val => {this.handleChange('info',val)}} />
                <Button type='primary' onClick={this.save}>保&nbsp;存</Button>
            </List>
        </div>
    )
  }
}

export default connect(
 state =>({user: state.user}) ,
 {updateUser}
)(DashenInfo);
