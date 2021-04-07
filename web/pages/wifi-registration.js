import React from 'react'
import LoginGate from '../components/LoginGate'
import Page from '../components/Page'
import WifiForm from '../components/Forms/WifiForm'

const WifiRegistration = () => {
  return (
    <Page>
      <h1>Staff Wifi Registration</h1>
      <LoginGate message='register a device'>
        <WifiForm />
      </LoginGate>
    </Page>
  )
}

export default WifiRegistration
