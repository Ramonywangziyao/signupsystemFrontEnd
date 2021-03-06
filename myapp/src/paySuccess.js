import React, { Component } from "react"
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Redirect } from "react-router-dom";
import history from './history';
import "./Appplus.css";

class paySuccess extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({redirect: true}), 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
      return this.state.redirect ?
      <Redirect to='/' /> :
      <div>
        <h3>结算成功</h3>
      </div>
    }
}

export default paySuccess;
