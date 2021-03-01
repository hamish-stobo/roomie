import React from 'react'
import { HashRouter } from "react-router-dom"
import { hot } from 'react-hot-loader/root'
import Router from './Router'
import '../../styles/styles'

const App = () => {
  return (
    <div>
      <HashRouter basename="/">
        <Router />
      </HashRouter>
    </div>
  )
}

export default hot(App)