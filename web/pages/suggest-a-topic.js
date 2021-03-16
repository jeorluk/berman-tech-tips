import { useSession } from 'next-auth/client'
import React from 'react'
import styled from 'styled-components'
import LoginGate from '../components/LoginGate'
import Page from '../components/Page'

const SuggestATopicStyles = styled.div``

const SuggestATopic = () => {
  const [session] = useSession()

  return (
    <Page>
      <h1>Contact Suggest a Topic</h1>
      <LoginGate message='suggest a topic'>
        <SuggestATopicStyles>
          <div>This is where you will submit a help request.</div>
        </SuggestATopicStyles>
      </LoginGate>
    </Page>
  )
}

export default SuggestATopic
