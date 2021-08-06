import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { StyledForm } from '../../styles/StyledForm'
import * as Yup from 'yup'
import Button from '../../styles/Button'
import SuccessMessage from '../SuccessMessage'
import useModal from '../../hooks/useModal'
const macRegex =
  /^([0-9a-fA-F][0-9a-fA-F][-:]{0,1}){5}([0-9a-fA-F][0-9a-fA-F])$/
const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required!'),
  deviceType: Yup.string().required('Required!'),
  macAddress: Yup.string()
    .required('Required!')
    .matches(macRegex, 'Not a valid MAC address'),
})

const WifiForm = () => {
  const { setComponent } = useModal()
  return (
    <Formik
      initialValues={{
        name: '',
        deviceType: '',
        macAddress: '',
      }}
      validationSchema={ValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        //Format MAC address for easy copy and paste
        const formattedMac = values.macAddress
          //Remove all : and - from the string
          .replace(/[:-]/g, '')
          //Insert - between every pair
          .replace(/(.{2})(.{2})(.{2})(.{2})(.{2})(.{2})/, '$1-$2-$3-$4-$5-$6')

        //Replace current form value for MAC address with formatted one.
        values.macAddress = formattedMac
        const response = await fetch('/api/sendAnEmail', {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ subject: 'Wifi Registration', ...values }),
        })
        const data = await response.json()
        if (!response.ok) {
          actions.setStatus(data.message)
        } else {
          setComponent(
            <SuccessMessage message='Thanks for submitting your MAC address.  You will receive a confirmation as soon as it has been registered.' />
          )
        }
      }}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <Form>
            <p className='text_large accent_text'>
              Please enter your MAC address here and submit the form. You will
              receive a confirmation email when your device has been registered
              and you can log into the Berman-Staff network.
            </p>
            <label className='required' htmlFor='name'>
              Name
              <ErrorMessage component='span' name='name' />
            </label>
            <Field name='name' type='text' />

            <label className='required' htmlFor='deviceType'>
              Device Type
              <ErrorMessage component='span' name='deviceType' />
            </label>
            <Field name='deviceType' type='text' />

            <label className='required' htmlFor='macAddress'>
              MAC Address
              <ErrorMessage component='span' name='macAddress' />
            </label>
            <Field name='macAddress' type='text' />
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

export default WifiForm
