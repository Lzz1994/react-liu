import React, { Component } from 'react'
import { Redirect, Switch } from 'react-router-dom'

class UserLayout extends Component {
  render () {
    return <Redirect to="/user"></Redirect>
  }
}

export default UserLayout