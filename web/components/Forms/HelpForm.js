import React from 'react'
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { StyledForm } from '../../styles/StyledForm'
import Button from '../../styles/Button'
import SuccessMessage from '../SuccessMessage'
import useModal from '../../hooks/useModal'

const ValidationSchema = Yup.object().shape({
  description: Yup.string().required('Required!'),
})

const HelpForm = () => {
  const { setComponent } = useModal()
  return (
    <Formik
      initialValues={{
        description: '',
        location: '',
        availability: '',
      }}
      validationSchema={ValidationSchema}
      onSubmit={async (values) => {
        const response = await fetch('/api/sendAnEmail', {
          method: 'POST',
          headers: { 'Content-Tyoe': 'application/json' },
          body: JSON.stringify({ subject: 'Support Request', ...values }),
        })
        const data = await response.json()
        if (!response.ok) {
          actions.setStatus(data.message)
        } else {
          setComponent(
            <SuccessMessage message='Thanks for submitting your idea.  We will be in touch if we have any questions.' />
          )
        }
      }}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <Form>
            <p className='text_large accent_text'>We're here to help!</p>
            <label htmlFor='description'>Describe your issue</label>
            <ErrorMessage component='span' name='description' />
            <Field as='textarea' name='description' rows='5' />

            <label htmlFor='location'>Room number</label>
            <ErrorMessage component='span' name='location' />
            <Field name='location' type='text' />

            <label htmlFor='availability'>
              Is there a time that you'd like to meet?
            </label>
            <ErrorMessage component='span' name='availability' />
            <Field name='availability' type='text' />

            <Button disabled={isSubmitting} type='submit'>
              Submit
            </Button>
          </Form>
        </StyledForm>
      )}
    </Formik>
  )
}

export default HelpForm
