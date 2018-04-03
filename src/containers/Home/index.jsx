import React, { Component } from 'react'
import './index.less'

import Loader from 'components/Loader'

class Home extends Component {
  render () {
    return <Loader color="#aaa" type="line-scale" style={{ textAlign: 'center', marginTop: '13rem' }} />
  }
}

export default Home