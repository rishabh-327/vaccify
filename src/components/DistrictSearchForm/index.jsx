import AppSectionTitle from '../AppSectionTitle'
import { Formik, Form } from 'formik'
import { Button } from 'react-bootstrap'

// import _s from './DistrictSearchForm.module.scss'

import AppInput from '../AppInput'
import AppSelect from '../AppSelect'

const DistrictSearchForm = () => {
  const initialValues = {
    state: '',
    district: '',
    date: '',
  }
  const validate = values => {
    const errors = {}

    if (!values.state) errors.state = 'Select a state'

    if (!values.district) errors.district = 'Select a ditsrict'

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
          <Form>
            <AppSelect label="STATE" id="state" name="state">
              <option value="">Select state</option>
              <option value="guj">Gujarat</option>
              <option value="raj">Rajasthan</option>
              <option value="mh">Maharashtra</option>
            </AppSelect>

            <AppSelect
              label="DISTRICT"
              id="district"
              name="district"
              className="mt-4"
            >
              <option value="">Select district</option>
              <option value="guj">Gujarat</option>
              <option value="raj">Rajasthan</option>
              <option value="mh">Maharashtra</option>
            </AppSelect>

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

            <Button variant="primary" block className="mt-4" type="submit">
              SEARCH
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default DistrictSearchForm
