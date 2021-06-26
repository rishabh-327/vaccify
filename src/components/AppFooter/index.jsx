import { Container, Row, Col } from 'react-bootstrap'
import { GitHub } from 'react-feather'

import _s from './AppFooter.module.scss'

const AppFooter = () => {
  return (
    <footer className={_s['appFooter']}>
      <Container className="h-100">
        <Row className="justify-content-between align-items-center h-100">
          {/* <Col>
            <p>
              Copyright &copy; 2021 <span className="app-title">vaccify</span>
            </p>
          </Col> */}
          <Col className="text-center">
            <p>
              <a
                href="https://github.com/rishabh-327/vaccify"
                target="_blank"
                rel="noreferrer"
              >
                <GitHub size="14" /> <span>Github</span>
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default AppFooter
