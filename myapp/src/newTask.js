import React, { Component } from "react"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import history from './history';


class newTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      available: false,
      numberOfItem: 0
    };

    this.submitCreation = this.submitCreation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  submitCreation(e) {
    const numberOfItem = this.state.numberOfItem;

    if(numberOfItem > 0) {
      fetch('/checkInSystem/newTask', {
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
        }
      })
    }
  }

  handleInputChange(e) {
    this.setState({numberOfItem: e.target.value});
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
          <h3>请输入件数</h3>
          <form>
            <input type="text" value = {this.state.numberOfItem} onChange = {this.handleInputChange}/><br /><br />
            <Button onClick={this.submitCreation}>创建</Button>
            <Button onClick={() => history.push('/')}>返回</Button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="unableToCreateTask">
          <h3>有正在进行的任务。无法新建</h3>
          <Button onClick={() => history.push('/')}>返回</Button>
        </div>
      );
    }
  }
}

export default newTask;
