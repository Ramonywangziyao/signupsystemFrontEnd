import React, { Component } from "react"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import history from './history';
import "./Appplus.css";

class pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      code: 0,
      tasks: [],
      taskChecked: {}
    };

    this.submitPayment = this.submitPayment.bind(this);
  }

  submitPayment(e) {
    let taskChecked = this.state.taskChecked;
    let submitList = [];
    let tasks = this.state.tasks;

    tasks.forEach((task) => {
      let checked = taskChecked[task.id];
      if(checked) {
        submitList.push(task.id);
      }
    });

    fetch('/checkInSystem/payment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitList)
    }).then(response => response.json()).then((data) => {
      const code = data.code;
      if(code == 1) {
        history.push('/paySuccess');
      }
    })

  }


  async componentDidMount() {
    const response = await fetch('/checkInSystem/unpaid');
    const body = await response.json();
    let code = body.code;
    let tasks = [];

    if(code == 1) {
      tasks = body.unpaid;
    }
    this.setState({isLoading: false, code: code, tasks: tasks})
  };

  render() {
    const {isLoading, code, tasks, taskChecked} = this.state;
    if(isLoading) {
      return <p>Loading</p>
    }

    tasks.forEach((task) => {
      let createDate = new Date(task.createDate);
      task.createDate = createDate.toLocaleString();
      let terminateDate = task.terminateDate == null ? "无" : new Date(task.terminateDate);
      task.terminateDate = terminateDate == null ? "无" : terminateDate.toLocaleString();
      taskChecked[task.id] = false;
    });


    if(code == 1 && tasks.length > 0) {
      return (
        <div className="taskStat">
          <h2>请选择要结算的任务</h2>
          <div>
            <form>
            {
              tasks.map((task) => (
                <div className="card">
                  <div>
                    <h4 className="listTitle"><span><input className="checkBox" type="checkbox" onChange={() => {
                      taskChecked[task.id] = !taskChecked[task.id];
                    }} value={taskChecked[task.id]} /></span>id</h4>
                    <p className="listValue">{task.id}</p>
                    <h4 className="listTitle">件数</h4>
                    <p className="listValue">{task.numberOfItem}</p>
                    <h4 className="listTitle">目前总时长(秒)</h4>
                    <p className="listValue">{task.totalTime}</p>
                    <h4 className="listTitle">收入</h4>
                    <p className="listValue">{task.income}</p>
                    <h4 className="listTitle">是否完成</h4>
                    <p className="listValue">{task.completed == 1 ? "已完成" : "进行中"}</p>
                    <h4 className="listTitle">是否结算工资</h4>
                    <p className="listValue">{task.paid == 1 ? "已结算" : "未结算"}</p>
                    <h4 className="listTitle">创建时间</h4>
                    <p className="listValue">{task.createDate}</p>
                    <h4 className="listTitle">终止时间</h4>
                    <p className="listValue">{task.terminateDate}</p>
                    <hr/>
                  </div>
                </div>
              ))
            }
            </form>
          </div><br/>
          <div>
            <Button className="selectButton" onClick={this.submitPayment}>结算</Button><br/>
            <Button className="selectButton" onClick={() => history.push('/')}>返回</Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="unableToContinueTask">
          <h3>没有可结算的任务</h3>
          <Button className="selectButton" onClick={() => history.push('/')}>返回</Button>
        </div>
      );
    }
  }
}

export default pay;
