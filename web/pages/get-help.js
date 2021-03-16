import { useSession } from 'next-auth/client'
import React from 'react'
import styled from 'styled-components'
import LoginGate from '../components/LoginGate'
import Page from '../components/Page'

const GetHelpStyles = styled.div``

const GetHelp = () => {
  const [session] = useSession()
  return (
    <Page>
      <h1>Contact Support</h1>
      <LoginGate message='contact support'>
        <GetHelpStyles>
          <div>This is where you will submit a help request.</div>
        </GetHelpStyles>
      </LoginGate>
    </Page>
  )
}

export default GetHelp
