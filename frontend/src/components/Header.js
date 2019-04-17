import React from 'react'
import styled from 'styled-components'
import Search from './Search'
import Nav from './Nav'

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 900px) {
    margin: 0;
    text-align: center;
  }
`

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.lightgrey};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`

export default function Header() {
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <a href="https://openroadmedia.com/">Open Road Media</a>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <Search />
      </div>
    </StyledHeader>
  )
}
