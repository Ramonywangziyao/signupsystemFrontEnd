import React, { Component } from "react"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import history from './history';


class stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      code: 0,
      tasks: []
    };

  }

  async componentDidMount() {
    const response = await fetch('/checkInSystem/stat');
    const body = await response.json();
    let code = body.code;
    let tasks = [];

    if(code == 1) {
      tasks = body.tasks;
    }
    this.setState({isLoading: false, code: code, tasks: tasks})
  };

  render() {
    const {isLoading, code, tasks} = this.state;
    if(isLoading) {
      return <p>Loading</p>
    }

    tasks.forEach((task) => {
      let createDate = new Date(task.createDate);
      task.createDate = createDate.toLocaleString();
      let terminateDate = task.terminateDate == null ? null : new Date(task.terminateDate);
      task.terminateDate = terminateDate == null ? null : terminateDate.toLocaleString();
    });


    if(code == 1) {
      return (
        <div className="taskStat">
          <div>
            {
              tasks.map((task) => (
                <div>
                  <h4>id</h4>
                  <p>{task.id}</p>
                  <h4>件数</h4>
                  <p>{task.numberOfItem}</p>
                  <h4>目前总时长(秒)</h4>
                  <p>{task.totalTime}</p>
                  <h4>收入</h4>
                  <p>{task.income}</p>
                  <h4>是否完成</h4>
                  <p>{task.completed == 1 ? "已完成" : "进行中"}</p>
                  <h4>是否结算工资</h4>
                  <p>{task.paid == 1 ? "已结算" : "未结算"}</p>
                  <h4>创建时间</h4>
                  <p>{task.createDate}</p>
                  <h4>终止时间</h4>
                  <p>{task.terminateDate}</p>
                  <hr/>
                </div>
              ))
            }
          </div>
          <div>
            <Button onClick={() => history.push('/')}>返回</Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="unableToContinueTask">
          <h3>未知错误</h3>
          <Button onClick={() => history.push('/')}>返回</Button>
        </div>
      );
    }
  }
}

export default stats;
