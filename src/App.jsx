import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import AsyncComponent from 'components/AsyncComponent'

import './App.less'

const Home = AsyncComponent(() => import(/* webpackChunkName: "home" */'containers/Home'))
const Graph = AsyncComponent(() => import(/* webpackChunkName: "graph" */'containers/Graph'))

@withRouter
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/graph/:id" component={Graph} />
        </Switch>
      </div>
    )
  }
}

export default App
