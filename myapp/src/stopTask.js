import React, { Component } from "react"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import history from './history';


class stopTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      code: -1,
      task: null,
      startTime: null
    };

    this.submitStop = this.submitStop.bind(this);
  }


  submitStop(e) {
    fetch('/checkInSystem/stop?taskId=' + this.state.task.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then((data) => {
      const code = data.code;
      if(code == 1) {
        history.push('/stopSuccess');
      }
    })
  }

  async componentDidMount() {
    const response = await fetch('/checkInSystem/current');
    const body = await response.json();
    let code = body.code;
    let task = null;
    let startTime = null;
    if(code == 1) {
      const inprogressResponse = await fetch('/checkInSystem/inprogress')
      const inprogressBody = await inprogressResponse.json();
      const inprogressCode = inprogressBody.code;
      if(inprogressCode == 1) {
        task = inprogressBody.task;
        startTime = inprogressBody.startTime;
        code = 2;
      }
    }
    this.setState({isLoading: false, code: code, task: task, startTime: startTime});
  };

  render() {
    const {isLoading, code} = this.state;

    if(isLoading) {
      return <p>Loading</p>
    }

    if(code == 2) {
      return (
        <div className="canStopTask">
          <div>
            <h4>id</h4>
            <p>{this.state.task.id}</p>
            <h4>件数</h4>
            <p>{this.state.task.numberOfItem}</p>
            <h4>目前总时长(秒)</h4>
            <p>{this.state.task.totalTime}</p>
            <h4>开始时间</h4>
            <p>{this.state.startTime}</p>
          </div>
          <div>
            <Button onClick={this.submitStop}>停止</Button>
            <Button onClick={() => history.push('/')}>返回</Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="unableToContinueTask">
          <h3>没有正在进行的任务</h3>
          <Button onClick={() => history.push('/')}>返回</Button>
        </div>
      );
    }
  }
}

export default stopTask;
