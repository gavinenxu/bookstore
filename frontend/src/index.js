import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import Page from './components/Page'
import * as serviceWorker from './serviceWorker'

const client = new ApolloClient({
  uri: 'https://us1.prisma.sh/enxu-guan-8da890/bookstore/dev'
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Page>
        <App />
      </Page>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
