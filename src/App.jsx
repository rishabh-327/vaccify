import { Container, Row, Col } from 'react-bootstrap'
import { Formik, Form } from 'formik'

import styles from './App.module.scss'

import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import AppSheet from './components/AppSheet'
import AppInput from './components/AppInput'
import AppSelect from './components/AppSelect'
import AppSectionTitle from './components/AppSectionTitle'

function App() {
  const initialValues = {
    pincode: '',
  }
  const validate = values => {
    const errors = {}

    if (!values.pincode || !values.pincode.trim()) errors.pincode = 'Required'
    else if (values.pincode.length !== 6)
      errors.pincode = 'Pincode must be of length 6'
    else if (!/^\d{6}$/.test(values.pincode))
      errors.pincode = 'Pincode must only contain numbers'

    if (!values.state) errors.state = 'Select a state'
    return errors
  }

  const formSubmit = (values, actions) => {
    console.log({ values, actions })
    actions.setSubmitting(false)
  }

  return (
    <>
      <AppHeader />

      <main className={styles.appContent}>
        <Container className="p-4">
          <Row className="justify-content-center">
            <Col lg="10">
              <AppSheet>
                <Row>
                  <Col className={styles.firstForm} md="6">
                    <Row className="justify-content-center">
                      <Col lg="8">
                        <AppSectionTitle title="Search By District" />
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row className="justify-content-center">
                      <Col lg="8">
                        <AppSectionTitle title="Search By Pincode" />
                        <Formik
                          initialValues={initialValues}
                          validate={validate}
                          onSubmit={formSubmit}
                        >
                          {() => (
                            <Form>
                              <AppInput
                                label="Pincode"
                                id="pincode"
                                name="pincode"
                                type="text"
                                placeholder="987321"
                              />

                              <AppSelect label="State" id="state" name="state">
                                <option value="">Select state</option>
                                <option value="guj">Gujarat</option>
                                <option value="raj">Rajasthan</option>
                                <option value="mh">Maharashtra</option>
                              </AppSelect>
                            </Form>
                          )}
                        </Formik>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </AppSheet>
            </Col>
          </Row>
        </Container>
      </main>

      <AppFooter />
    </>
  )
}

export default App
