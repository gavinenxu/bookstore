import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import React from 'react'
import Header from './Header'

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  boxShadow: '0 12px 24px 0 rgba(0,0,0,0.09)'
}

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    line-height: 2;
    font-family: Arial, Helvetica, sans-serif;
  }
  a {
    text-decoration: none;
    color: ${theme.black}
  }
`

export default function Page(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Header />
        <Inner>{children}</Inner>
      </StyledPage>
    </ThemeProvider>
  )
}
