import React, { Component } from "react"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import history from './history';
import "./Appplus.css";

class newTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      available: false,
      numberOfItem: 0,
      password: ""
    };

    this.submitCreation = this.submitCreation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }


  submitCreation(e) {
    const numberOfItem = this.state.numberOfItem;

    if(numberOfItem > 0) {
      fetch('/checkInSystem/newTask?password=' + this.state.password, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numberOfItem: numberOfItem
        })
      }).then(response => response.json()).then((data) => {
        const code = data.code;

        if(code == 1) {
          history.push('/createSuccess');
        } else {
          history.push('/unauthorized');
        }
      })
    }
  }

  handleInputChange(e) {
    this.setState({numberOfItem: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  async componentDidMount() {
    const response = await fetch('/checkInSystem/current');
    const body = await response.json();
    const code = body.code;
    if(code == -1) {
      this.setState({isLoading: false, available: true})
    } else {
      this.setState({isLoading: false, available: false});
    }
  };

  render() {
    const {isLoading, available} = this.state;

    if(isLoading) {
      return <p>Loading</p>
    }

    if(available == true) {
      return (
        <div className="createNewTask">
          <form>
            <h3>请输入件数</h3>
            <input className="typeField" type="text" value = {this.state.numberOfItem} onChange = {this.handleInputChange}/><br /><br />
            <h3>请输入密码</h3>
            <input className="typeField" type="password" value = {this.state.password} onChange = {this.handlePasswordChange}/><br /><br />
            <Button className="selectButton" onClick={this.submitCreation}>创建</Button><br/>
            <Button className="selectButton" onClick={() => history.push('/')}>返回</Button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="unableToCreateTask">
          <h3>有正在进行的打包单<br/>无法新建</h3>
          <Button className="selectButton" onClick={() => history.push('/')}>返回</Button>
        </div>
      );
    }
  }
}

export default newTask;
