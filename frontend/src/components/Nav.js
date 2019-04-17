import React from 'react'
import { Link } from 'react-router-dom'
import NavStyle from '../styles/NavStyle'

export default function Nav() {
  return (
    <NavStyle>
      <Link to={{ pathname: '/' }}>Home</Link>
    </NavStyle>
  )
}
