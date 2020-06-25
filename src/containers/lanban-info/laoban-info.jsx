import React, {Component} from 'react';
import { connect } from 'react-redux';
import {NavBar, WingBlank, InputItem, List, Button, TextareaItem} from 'antd-mobile';

import HeaderSelector from '../../components/header-selector/header-selector'
import { updateUser } from '../../redux/actions';
 
class LanbanInfo extends Component{
  state = {
    header: "",
    info:"",
    post:"",
    salary:"",
    company:""
  };
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  setHeader = (header) => {
    this.setState({header})
  }
  save = () => {
    this.props.updateUser(this.state)
  }
  render(){
    return (
        <div>
            <NavBar>老&nbsp;板&nbsp;信&nbsp;息&nbsp;完&nbsp;善</NavBar>
            <HeaderSelector setHeader={this.setHeader}/>
            <WingBlank/>
            <List>
                <InputItem placeholder='请输入招聘职位' onChange={val => {this.handleChange('post',val)}}>招聘职位:</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={val => {this.handleChange('company',val)}} >公司名称:</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={val => {this.handleChange('salary',val)}} >职位薪资:</InputItem>
                <TextareaItem title='职位要求:' rows={3} onChange={val => {this.handleChange('info',val)}} />
                <Button type='primary'  onClick = {this.save}>保&nbsp;存</Button>
            </List>
        </div>
    )
  }
}

export default connect(
 state =>({user: state.user}) ,
 {updateUser}
)(LanbanInfo);
