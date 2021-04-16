import React from 'react'
import * as Forms from '.'
import LoginGate from '../LoginGate'

const RenderForm = ({ formName }) => {
  const Form = Forms[formName]
  return Form ? (
    <LoginGate message='submit a form'>
      <Form />
    </LoginGate>
  ) : (
    <div>Missing Form</div>
  )
}

export default RenderForm
