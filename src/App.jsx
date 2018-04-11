import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import AsyncComponent from 'components/AsyncComponent'

import './App.less'


const Graph = AsyncComponent(() => import(/* webpackChunkName: "graph" */'containers/Graph'))

@withRouter
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Graph} />
        </Switch>
      </div>
    )
  }
}

export default App
