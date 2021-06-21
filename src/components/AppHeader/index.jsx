import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import classNames from 'classnames'

import ThemeSwitcher from '../ThemeSwitcher'

import _s from './AppHeader.module.scss'

const AppHeader = () => {
  return (
    <header className={classNames(_s['appHeader'])}>
      <Container className="h-100">
        <Row className="h-100 align-items-center justify-content-between">
          <Col>
            <h3 className={classNames(_s.appTitle, 'app-title')}>
              <Link to="/">vaccify</Link>
            </h3>
          </Col>
          <Col className="flex-grow-0">
            <ThemeSwitcher />
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default AppHeader
