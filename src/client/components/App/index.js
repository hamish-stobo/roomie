import React from 'react'
import { HashRouter } from "react-router-dom"
import { hot } from 'react-hot-loader/root'
import Router from './Router'
import '../../styles/styles'

const App = () => {
  return (
      <HashRouter basename="/">
        <Router />
      </HashRouter>
  )
}

export default hot(App)