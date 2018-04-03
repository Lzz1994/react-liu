import React, { Component } from 'react'
import { Redirect, Switch } from 'react-router-dom'

class GraphLayout extends Component {

  componentDidMount () {
    
  }

  render () {
    return <Redirect to="/user"></Redirect>
  }
}

export default GraphLayout