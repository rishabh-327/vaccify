import { Container, Row, Col } from 'react-bootstrap'
import styles from './AppFooter.module.scss'

const AppFooter = () => {
  return (
    <footer className={styles['appFooter']}>
      <Container className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col>
            <p>
              Copyright &copy; 2021 <span className="app-title">vaccify</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default AppFooter
