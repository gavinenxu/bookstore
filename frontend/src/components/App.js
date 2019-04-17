import React from 'react'
import { Switch, Route } from 'react-router'
import Books from './Books'
import SingleBook from './SingleBook'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Books} />
      <Route exact path="/book" component={SingleBook} />
    </Switch>
  )
}
