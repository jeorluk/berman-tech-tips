import React from 'react'
import styled from 'styled-components'
import { useSession, signIn, signOut } from 'next-auth/client'
import Link from 'next/link'

const NavStyles = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 800px) {
    justify-content: flex-end;
  }
  ul {
    width: 100%;
    max-width: 500px;
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    margin: 0;
    margin-left: auto;
    padding: 0;
    color: var(--text-light);
    font-size: var(--size-up-two);
  }
  li:only-child {
    width: 100%;
    text-align: end;
  }
  li {
    text-align: center;
  }

  button {
    background: var(--main-dark);
  }
`

const Nav = () => {
  const [session] = useSession()

  function handleSignin(e) {
    e.preventDefault()
    signIn('google')
  }

  function handleSignout(e) {
    e.preventDefault()
    signOut()
  }

  return (
    <NavStyles>
      <ul className='desktop-menu'>
        {session ? (
          <>
            <li>
              <div className='item-inner'>
                <Link href='/'>
                  <a className='item-inner'>Suggest a Topic</a>
                </Link>
              </div>
            </li>
            <li>
              <Link href='/gethelp'>
                <a>Get Help</a>
              </Link>
            </li>
            <li>
              <button onClick={handleSignout}>Log Out</button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleSignin}>Log In</button>
          </li>
        )}
      </ul>
    </NavStyles>
  )
}

export default Nav
