import { useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { Button } from 'react-bootstrap'

import AppInput from '../AppInput'

const PincodeSearchForm = props => {
  const { date, pincode } = useSelector(state => state.search)

  const initialValues = {
    pincode,
    date,
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
    actions.setSubmitting(false)
    props.searchHandler('Pin', values)
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
              id="date-pincode"
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
              SEARCH
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default PincodeSearchForm
