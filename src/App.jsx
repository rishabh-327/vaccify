import { Container, Row, Col } from 'react-bootstrap'

import styles from './App.module.scss'

import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import AppSheet from './components/AppSheet'

function App() {
  return  (
    <>
      <AppHeader />
      <main className={styles.appContent}>
        <Container>
          <Row className="justify-content-center">
            <Col lg="10">
              <AppSheet>
                <Row>
                  <Col className={styles.firstForm} md="6">
                    <Row className="justify-content-center">
                      <Col lg="8">
                        <h5>Search by District</h5>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="6">
                    <Row className="justify-content-center">
                      <Col lg="8">
                        <h5>Search by Pincode</h5>
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
