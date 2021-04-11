import React from 'react'
import * as Forms from '.'

const RenderForm = ({ formName }) => {
  const Form = Forms[formName]
  return Form ? <Form /> : <div>Missing Form</div>
}

export default RenderForm
