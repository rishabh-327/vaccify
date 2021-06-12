import { Container, Row, Col } from 'react-bootstrap'
import { Formik, Form } from 'formik'

import styles from './App.module.scss'

import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import AppSheet from './components/AppSheet'
import AppInput from './components/AppInput'

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
                        <h4>Search by District</h4>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row className="justify-content-center">
                      <Col lg="8">
                        <h4>Search by Pincode</h4>
                        <Formik
                          initialValues={initialValues}
                          validate={validate}
                          onSubmit={formSubmit}
                        >
                          {() => (
                            <Form>
                              <AppInput
                                label="PINCODE"
                                id="pincode"
                                name="pincode"
                                type="text"
                                placeholder="987321"
                              />
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
