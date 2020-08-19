import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import App from './App';
import NewTask from "./newTask";
import ContinueTask from "./continueTask";
import StopTask from "./stopTask";
import TerminateTask from "./terminateTask";
import Stat from "./stats";
import Pay from "./pay";
import CreateSuccess from "./createSuccess";
import ContinueSuccess from "./continueSuccess";
import StopSuccess from "./stopSuccess";
import TerminationSuccess from "./terminationSuccess";
import PaySuccess from "./paySuccess";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/newTask" exact component={NewTask} />
                    <Route path="/continue" component={ContinueTask} />
                    <Route path="/stop" component={StopTask} />
                    <Route path="/terminate" component={TerminateTask} />
                    <Route path="/stats" component={Stat} />
                    <Route path="/pay" component={Pay} />
                    <Route path="/createSuccess" component={CreateSuccess} />
                    <Route path="/continueSuccess" component={ContinueSuccess} />
                    <Route path="/stopSuccess" component={StopSuccess} />
                    <Route path="/terminationSuccess" component={TerminationSuccess} />
                    <Route path="/paySuccess" component={PaySuccess} />
                </Switch>
            </Router>
        )
    }
}
