import React, { Component } from "react";
import { Sidebar, MainContainer } from "./";

export default class Slack extends Component {
  render() {
    return (
      <div>
        <h1>This is Slack</h1>
        <Sidebar />
        <MainContainer />
      </div>
    );
  }
}
