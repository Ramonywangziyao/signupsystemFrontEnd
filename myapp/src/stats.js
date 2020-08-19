import React, { Component } from "react"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import history from './history';
import "./Appplus.css";

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
    let totalIncome = 0;
    tasks.forEach((task) => {
      let createDate = new Date(task.createDate);
      task.createDate = createDate.toLocaleString();
      let terminateDate = task.terminateDate == null ? null : new Date(task.terminateDate);
      task.terminateDate = terminateDate == null ? null : terminateDate.toLocaleString();
      totalIncome += task.income;
    });


    if(code == 1) {
      return (
        <div className="taskStat">
          <h2>任务历史记录</h2>
          <h3>当前总收入 $<span>{totalIncome.toFixed(2)}</span></h3>
          <div>
            {
              tasks.map((task) => (
                <div className="card">
                  <h4 className="listTitle">id</h4>
                  <p className="listValue">{task.id}</p>
                  <h4 className="listTitle">件数</h4>
                  <p className="listValue">{task.numberOfItem}</p>
                  <h4 className="listTitle">目前总时长(秒)</h4>
                  <p className="listValue">{task.totalTime}</p>
                  <h4 className="listTitle">收入</h4>
                  <p className="listValue">{task.income.toFixed(2)}</p>
                  <h4 className="listTitle">是否完成</h4>
                  <p className="listValue">{task.completed == 1 ? "已完成" : "进行中"}</p>
                  <h4 className="listTitle">是否结算工资</h4>
                  <p className="listValue">{task.paid == 1 ? "已结算" : "未结算"}</p>
                  <h4 className="listTitle">创建时间</h4>
                  <p className="listValue">{task.createDate}</p>
                  <h4 className="listTitle">终止时间</h4>
                  <p className="listValue">{task.terminateDate == null ? "无" : task.terminateDate}</p>
                  <div className="pad">
                    <hr/>
                  </div>
                </div>
              ))
            }
          </div>
          <div>
            <Button className="selectButton" onClick={() => history.push('/')}>返回</Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="unableToContinueTask">
          <h3>未知错误</h3>
          <Button className="selectButton" onClick={() => history.push('/')}>返回</Button>
        </div>
      );
    }
  }
}

export default stats;
