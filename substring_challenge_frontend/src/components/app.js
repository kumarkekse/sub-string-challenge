import React, { Component } from "react"
import { Router, Route, Redirect } from "react-router-dom"
import {createBrowserHistory} from "history"
import SignUp from "./signUp"
import SignIn from "./signIn"
import CreateStringMatches from './createStringMatches'
import StringMatchesList from './stringMatchesList'

const history = createBrowserHistory()

class App extends Component {
  render() {
    const token = localStorage.getItem('token')
    let routePath = "/sign_in"
    if(token){
      routePath = "/create_string_matches"
    }
    return (
      <Router history={history}>
        <div>
          <Route history={history} exact path="/" render={() => <Redirect to={routePath}/>} />
          <Route history={history}  path={"/sign_up"} component={SignUp} />
          <Route history={history}  path={"/sign_in"} component={SignIn} />
          <Route history={history}  path={"/create_string_matches"} component={CreateStringMatches} />
          <Route history={history}  path={"/string_matches_list"} component={StringMatchesList} />
        </div>
      </Router>
    )
  }
}

export default App

