import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/client'
import useModal from '../hooks/useModal'
import SuggestTopicForm from './Forms/SuggestTopicForm'
import HelpForm from './Forms/HelpForm'
import WifiForm from './Forms/WifiForm'

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
    margin: auto;
    content: '';
    display: block;
    background: var(--text-light);
    height: 2px;
    width: 0;
    transition: width 0.3s;
  }
  button:hover:after {
    width: 100%;
  }
`

const Nav = () => {
  const [session] = useSession()
  // const { setIsVisible, setComponent } = useContext(ModalContext)
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
                  setComponent(<WifiForm />)
                  setIsVisible(true)
                }}
              >
                WiFi
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  setComponent(<SuggestTopicForm />)
                  setIsVisible(true)
                }}
              >
                Suggest a Topic
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  setComponent(<HelpForm />)
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
