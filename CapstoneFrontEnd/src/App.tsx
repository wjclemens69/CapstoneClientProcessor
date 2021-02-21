import React, { Component } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { EditTodo } from './components/EditTodo'
import { LogIn } from './components/LogIn'
import { NotFound } from './components/NotFound'
import { Todos } from './components/Todos'
import * as AWS from 'aws-sdk';
import * as csv from 'fast-csv';
import { parse } from '@fast-csv/parse';
import { EOL } from 'os';
import {checkClientFileQueu} from './api/clientFileProcessing'

export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}



export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)




  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    return (
      <Menu>
        <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={this.handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={this.handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  }

  generateCurrentPage() {
    console.log("Generating Page...")
    if (!this.props.auth.isAuthenticated()) {
      return <LogIn auth={this.props.auth} />
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => {
            return <Todos {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/todos/:todoId/edit"
          exact
          render={props => {
            return <EditTodo {...props} auth={this.props.auth} />
          }}
        />

        <Route component={NotFound} />
      </Switch>
    )

async function gets3() {
    
      let fileKey = 'ClientTestFile.csv';
var AWS = require('aws-sdk');

var s3 = new AWS.S3({
  accessKeyId: 'AKIA3BDNE5YUBQA42XFS',
  secretAccessKey: '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'
})

var bucketParams = {
  Bucket : 'clientfilesbucketb-dev',
  Key: 'ClientTestFile.csv'
};


      let data = await s3.getObject(bucketParams).promise()



    }


  }

 

}

interface car{

name: string,
lastname: string

}

interface Row{
  
    PURCHASEDATE: string,
    CANDYPURCHASED: string,
    CASHPAID: string,
    BUYERNAME: string 

}

interface Items{
Row:Row[]

}

