import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { SignIn, Slack } from "./";

function Home() {
  return (
    <div>
      <h1>This is HomePage</h1>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/slack' component={Slack} />
        </Switch>
      </div>
    );
  }
}

export default App;
