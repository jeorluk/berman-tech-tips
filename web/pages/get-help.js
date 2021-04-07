import React from 'react'
import HelpForm from '../components/Forms/HelpForm'
import LoginGate from '../components/LoginGate'
import Page from '../components/Page'

const GetHelp = () => {
  return (
    <Page>
      <h1>Contact Support</h1>
      <LoginGate message='contact support'>
        <HelpForm />
      </LoginGate>
    </Page>
  )
}

export default GetHelp
