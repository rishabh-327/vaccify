import { Formik, Form } from 'formik'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// import _s from './PincodeSearchForm.module.scss'

import AppInput from '../AppInput'

const PincodeSearchForm = () => {
  const initialValues = {
    pincode: '',
    date: '',
  }
  const validate = values => {
    const errors = {}

    if (!values.pincode || !values.pincode.trim()) errors.pincode = 'Required'
    else if (values.pincode.length !== 6)
      errors.pincode = 'Pincode must be of length 6'
    else if (!/^\d{6}$/.test(values.pincode))
      errors.pincode = 'Pincode must only contain numbers'

    if (!values.date) errors.date = 'Pick a date'
    return errors
  }

  const formSubmit = (values, actions) => {
    console.log({ values, actions })
    actions.setSubmitting(false)
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={formSubmit}
      >
        {() => (
          <Form className="flex-grow-1 d-flex flex-column">
            <AppInput
              label="PINCODE"
              id="pincode"
              name="pincode"
              type="text"
              placeholder="987321"
            />
            <AppInput
              label="DATE"
              id="date"
              name="date"
              type="date"
              min={new Date()
                .toLocaleDateString()
                .split('/')
                .reverse()
                .join('-')}
              className="mt-4"
            />
            <div className="flex-grow-1"></div>
            <Button variant="primary" block className="mt-4" type="submit">
              <Link to="/appointments">SEARCH</Link>
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default PincodeSearchForm
