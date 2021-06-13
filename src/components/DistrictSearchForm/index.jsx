import { Formik, Form } from 'formik'
import { Button } from 'react-bootstrap'

// import _s from './DistrictSearchForm.module.scss'

import AppInput from '../AppInput'
import AppSelect from '../AppSelect'

import states from '../../data/states'
import districts from '../../data/districts'

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
    console.log({ values })
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
              {states.map(state => (
                <option value={state.state_id} key={state.state_id}>
                  {state.state_name}
                </option>
              ))}
            </AppSelect>

            <AppSelect
              label="DISTRICT"
              id="district"
              name="district"
              className="mt-4"
            >
              <option value="">Select district</option>
              {districts.map(district => (
                <option value={district.district_id} key={district.district_id}>
                  {district.district_name}
                </option>
              ))}
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
