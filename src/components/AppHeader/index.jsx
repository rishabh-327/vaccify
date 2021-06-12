import { Col, Container, Row } from 'react-bootstrap'
import classNames from 'classnames'
import styles from './AppHeader.module.scss'

const AppHeader = () => {
  return (
    <header className={classNames(styles['appHeader'], 'app-title')}>
      <Container className="h-100">
        <Row className="h-100 align-items-center">
          <Col className="text-center">
            <h3 className={styles['app-title']}>vaccify</h3>
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default AppHeader
