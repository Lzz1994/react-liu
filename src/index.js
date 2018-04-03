import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import './index.css'
import App from './App'
import ErrorBoundary from 'components/ErrorBoundary'
import registerServiceWorker from './registerServiceWorker'
import RootStore from './stores'

const rootStore = new RootStore()

ReactDOM.render(
  <Router>
    <Provider {...rootStore}>
      <ErrorBoundary>
        <App />
      </ ErrorBoundary>
    </Provider>
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
