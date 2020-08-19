import React, { Component } from "react"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import history from './history';


class terminateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      code: -1,
      task: null,
      startTime: null,
      endTime: null
    };

    this.submitTerminate = this.submitTerminate.bind(this);
  }


  submitTerminate(e) {
    fetch('/checkInSystem/termination?taskId=' + this.state.task.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then((data) => {
      const code = data.code;
      if(code == 1) {
        history.push('/terminationSuccess');
      }
    })
  }

  async componentDidMount() {
    const response = await fetch('/checkInSystem/current');
    const body = await response.json();
    let code = body.code;
    let task = null;
    let startTime = null;
    let endTime = null;
    if(code == 1) {
      startTime = body.startTime;
      endTime = body.endTime;
      task = body.task;
      const inprogressResponse = await fetch('/checkInSystem/inprogress')
      const inprogressBody = await inprogressResponse.json();
      const inprogressCode = inprogressBody.code;
      if(inprogressCode == 1) {
        code = 2;
      }
    }
    this.setState({isLoading: false, code: code, task: task, startTime: startTime, endTime: endTime});
  };

  render() {
    const {isLoading, code} = this.state;

    if(isLoading) {
      return <p>Loading</p>
    }

    if(code == 1) {
      return (
        <div className="canStopTask">
          <div>
            <h4>id</h4>
            <p>{this.state.task.id}</p>
            <h4>件数</h4>
            <p>{this.state.task.numberOfItem}</p>
            <h4>目前总时长(秒)</h4>
            <p>{this.state.task.totalTime}</p>
            <h4>上次开始时间</h4>
            <p>{this.state.startTime}</p>
            <h4>上次结束时间</h4>
            <p>{this.state.endTime}</p>
          </div>
          <div>
            <Button onClick={this.submitTerminate}>终止</Button>
            <Button onClick={() => history.push('/')}>返回</Button>
          </div>
        </div>
      );
    } else if(code == 2) {
      return (
        <div className="unableToContinueTask">
          <h3>有还未停止的任务，请先停止</h3>
          <Button onClick={() => history.push('/')}>返回</Button>
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

export default terminateTask;
