import React from 'react'
import styled from 'styled-components'
import Nav from './Nav'
import { BermanLogo } from '../Icons'

const HeaderStyles = styled.header`
  background: var(--main-dark);
  display: grid;
  grid-template-columns: 1fr;

  .logo {
    justify-self: center;
    width: 300px;
    svg {
      height: 100%;
      width: 100%;
    }
  }
  @media (min-width: 1200px) {
    padding: 1rem;
    grid-template-columns: auto 1fr;
  }
`

const Header = () => {
  return (
    <HeaderStyles>
      <div className='logo'>
        {/* <a href='https://bermanhebrewacademy.org'> */}
        <BermanLogo title='Berman Hebrew Academy home page' />
        {/* </a> */}
      </div>
      <Nav />
    </HeaderStyles>
  )
}

export default Header
