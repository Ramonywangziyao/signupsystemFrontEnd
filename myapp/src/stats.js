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
    let unpaidIncome = 0;
    let paidIncome = 0;
    let totalItems = 0;
    tasks.forEach((task) => {
      let createDate = new Date(task.createDate);
      task.createDate = createDate.toLocaleString();
      let terminateDate = task.terminateDate == null ? null : new Date(task.terminateDate);
      task.terminateDate = terminateDate == null ? null : terminateDate.toLocaleString();

      if(task.completed == 1) {
        totalIncome += task.income;
      }

      totalItems += task.numberOfItem;
      if(task.paid == 0) {
        unpaidIncome += task.income;
      } else {
        paidIncome += task.income;
      }
    });


    if(code == 1) {
      return (
        <div className="taskStat">
          <h2>任务历史记录</h2>
          <h4>当前一共打包了 <span>{totalItems} 件货</span></h4>
          <h4>当前总收入 $<span>{totalIncome.toFixed(2)}</span></h4>
          <h4>已结算金额 $<span>{paidIncome.toFixed(2)}</span></h4>
          <h4>未结算金额 $<span>{unpaidIncome.toFixed(2)}</span></h4>
          <div>
            {
              tasks.map((task) => (
                <div className={task.completed == 1 ? "card" : "workingCard"}>
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
        </div>
      );
    } else {
      return (
        <div className="unableToContinueTask">
          <h3>未知错误</h3>
        </div>
      );
    }
  }
}

export default stats;
