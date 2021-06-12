import styles from './AppHeader.module.scss'
import { Col, Container, Row } from 'react-bootstrap'

const AppHeader = () => {
  return (
    <header className={styles['app-header']}>
      <Container className="h-100">
        <Row className="h-100 align-items-center">
          <Col>
            <h3 className={styles['app-title']}>vaccify</h3>
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default AppHeader
