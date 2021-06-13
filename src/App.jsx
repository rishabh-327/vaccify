import { Container, Row, Col } from 'react-bootstrap'
import classnames from 'classnames'

import styles from './App.module.scss'

import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import AppSheet from './components/AppSheet'
import AppSectionTitle from './components/AppSectionTitle'

import DistrictSearchForm from './components/DistrictSearchForm'
import PincodeSearchForm from './components/PincodeSearchForm'

function App() {
  return (
    <>
      <AppHeader />

      <main className={styles.appContent}>
        <Container>
          <Row className="justify-content-center py-md-5">
            <Col lg="10">
              <AppSheet className="py-md-5">
                <Row>
                  <Col
                    className={classnames(
                      styles.firstForm,
                      'px-0 px-md-3 pb-3 pb-md-0'
                    )}
                    md="6"
                  >
                    <Row className="justify-content-center">
                      <Col xs="11" sm="10" lg="8">
                        <div className="d-flex flex-column justify-content-between py-md-4">
                          <AppSectionTitle
                            className="mb-4"
                            title="Search By District"
                          />
                          <DistrictSearchForm />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="px-0 px-md-3 pt-3 pt-md-0" md="6">
                    <Row className="justify-content-center h-100">
                      <Col xs="11" sm="10" lg="8">
                        <div className="d-flex flex-column justify-content-between h-100 py-md-4">
                          <AppSectionTitle
                            className="mb-4"
                            title="Search By Pincode"
                          />
                          <PincodeSearchForm />
                        </div>
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
