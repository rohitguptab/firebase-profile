import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

import RegisterComp from './RegisterComp';
import LoginComp from './LoginComp';
class Login extends Component {
  render() {
    return (
      <div className="login-box">
        <Tabs>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanel>
            <LoginComp />
          </TabPanel>
          <TabPanel>
            <RegisterComp />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Login;
