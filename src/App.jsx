import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import AsyncComponent from 'components/AsyncComponent'

import './App.less'

const Home = AsyncComponent(() => import(/* webpackChunkName: "home" */'containers/Home'))

@withRouter
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/test" render={() => <h1>Test</h1>} />
        </Switch>
      </div>
    )
  }
}

export default App
