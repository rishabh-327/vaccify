import { useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { Button } from 'react-bootstrap'

import AppInput from '../AppInput'
import AppSelect from '../AppSelect'

const DistrictSearchForm = props => {
  const { states, districts } = useSelector(state => ({
    states: state.meta.states,
    districts: state.meta.districts,
  }))

  const {
    date,
    district: { state_id, district_id },
  } = useSelector(state => state.search)

  const initialValues = {
    state: state_id,
    district: district_id,
    date,
  }

  const validate = values => {
    const errors = {}

    if (!values.state) errors.state = 'Select a state'

    if (!values.district) errors.district = 'Select a ditsrict'

    if (!values.date) errors.date = 'Pick a date'
    return errors
  }

  const formSubmit = (values, actions) => {
    actions.setSubmitting(false)
    props.searchHandler('District', values)
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
              id="date-district"
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
