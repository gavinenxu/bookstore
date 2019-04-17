import React from 'react'
import { Switch, Route } from 'react-router'
import Books from './Books'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Books} />
    </Switch>
  )
}
