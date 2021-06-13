import { Container, Row, Col } from 'react-bootstrap'

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
        <Container className="p-4">
          <Row className="justify-content-center">
            <Col lg="10">
              <AppSheet className="py-5">
                <Row>
                  <Col className={styles.firstForm} md="6">
                    <Row className="justify-content-center">
                      <Col lg="8">
                        <div className="d-flex flex-column justify-content-between py-4">
                          <AppSectionTitle
                            className="mb-4"
                            title="Search By District"
                          />
                          <DistrictSearchForm />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row className="justify-content-center h-100">
                      <Col lg="8">
                        <div className="d-flex flex-column justify-content-between h-100 py-4">
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
