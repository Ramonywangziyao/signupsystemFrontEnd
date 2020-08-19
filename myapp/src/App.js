import React, { Component } from "react"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import history from './history';


class App extends Component {
  render() {
      return (
        <div className="App">
          <form>
            <Button onClick={() => history.push('/newTask')}>创建新任务</Button>
            <Button onClick={() => history.push('/continue')}>开始工作</Button>
            <Button onClick={() => history.push('/stop')}>结束工作</Button>
            <Button onClick={() => history.push('/terminate')}>终止任务</Button>
            <Button onClick={() => history.push('/stats')}>查看任务历史</Button>
            <Button onClick={() => history.push('/pay')}>结算</Button>
          </form>
        </div>
      );
    }
}

export default App;
