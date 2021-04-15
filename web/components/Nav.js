import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/client'
import useModal from '../hooks/useModal'
import RenderForm from './Forms/RenderForm'

const NavStyles = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding-top: 1rem;

  @media (min-width: 1200px) {
    justify-content: flex-end;
    padding-top: 0;
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
    font-size: var(--size-up-one);
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
    display: inline-block;
  }

  button:after {
    background: var(--text-light);
`

const Nav = () => {
  const [session] = useSession()
  const { setIsVisible, setComponent } = useModal()

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
              <button
                onClick={(e) => {
                  setComponent(<RenderForm formName='WifiForm' />)
                  setIsVisible(true)
                }}
              >
                WiFi
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  setComponent(<RenderForm formName='SuggestTopicForm' />)
                  setIsVisible(true)
                }}
              >
                Suggest a Topic
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  setComponent(<RenderForm formName='HelpForm' />)
                  setIsVisible(true)
                }}
              >
                Get Help
              </button>
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
