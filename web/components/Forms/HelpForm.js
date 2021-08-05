import React from 'react'
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { StyledForm } from '../../styles/StyledForm'
import Button from '../../styles/Button'
import SuccessMessage from '../SuccessMessage'
import useModal from '../../hooks/useModal'

const ValidationSchema = Yup.object().shape({
  subject: Yup.string().required('Required!'),
})

const HelpForm = () => {
  const { setComponent } = useModal()
  return (
    <Formik
      initialValues={{
        subject: '',
        description: '',
        location: '',
        availability: '',
      }}
      validationSchema={ValidationSchema}
      onSubmit={async (values) => {
        const response = await fetch('/api/sendAnEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subject: 'Support Request', ...values }),
        })
        const data = await response.json()
        if (!response.ok) {
          actions.setStatus(data.message)
        } else {
          setComponent(
            <SuccessMessage message='Thanks for submitting a help request.  We will be in touch soon to help you.' />
          )
        }
      }}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <Form>
            <p className='text_large accent_text'>
              We're here to help! Please use this form to send an email to our
              support team. Remember that the more details you can tell us, the
              easier it is for us to help you.
            </p>

            <label className='required' htmlFor='subject'>
              Subject
              <ErrorMessage component='span' name='subject' />
            </label>
            <Field name='subject' type='text' />

            <label htmlFor='description'>Describe your issue</label>
            <ErrorMessage component='span' name='description' />
            <Field as='textarea' name='description' rows='5' />

            <label htmlFor='location'>Room number</label>
            <ErrorMessage component='span' name='location' />
            <Field name='location' type='text' />

            <label htmlFor='availability'>
              Is there a specific deadline you need to meet, or a time that you
              are available to troubleshoot your issue?
            </label>
            <ErrorMessage component='span' name='availability' />
            <Field name='availability' type='text' />
            <p>* indicates a required field.</p>

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
