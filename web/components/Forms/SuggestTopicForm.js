import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { StyledForm } from '../../styles/StyledForm'
import * as Yup from 'yup'
import Button from '../../styles/Button'
import SuccessMessage from '../SuccessMessage'
import useModal from '../../hooks/useModal'

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required('Required!'),
  description: Yup.string().required('Required!'),
})

const SuggestTopicForm = () => {
  const { setComponent } = useModal()
  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      validationSchema={ValidationSchema}
      onSubmit={async (values, actions) => {
        const response = await fetch('/api/sendAnEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ subject: 'Topic Suggestion', ...values }),
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
      {({ isSubmitting, status }) => (
        <StyledForm>
          <Form>
            <p className='text_large accent_text'>
              Didn't find what you were looking for?
              <br />
              Let us know!
            </p>
            {status && <span>{status}</span>}
            <label className='required' htmlFor='title'>
              Topic Title
              <ErrorMessage component='span' name='title' />
            </label>
            <Field name='title' type='text' />

            <label className='required' htmlFor='description'>
              Let us know any details you think should be included
              <ErrorMessage component='span' name='description' />
            </label>
            <Field as='textarea' name='description' rows='5' />
            <p>* indicates a required field.</p>
            <Button type='submit' disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        </StyledForm>
      )}
    </Formik>
  )
}

export default SuggestTopicForm
