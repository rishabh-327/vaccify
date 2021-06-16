import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Sun, Moon } from 'react-feather'
import classNames from 'classnames'
import styles from './AppHeader.module.scss'

const body = document.querySelector('body')

const AppHeader = () => {
  const [darkMode, setDarkMode] = useState(false)

  function toggleThemeHandler() {
    body.classList.toggle('dark')
    body.classList.toggle('light')

    setDarkMode(!darkMode)
  }

  return (
    <header className={classNames(styles['appHeader'])}>
      <Container className="h-100">
        <Row className="h-100 align-items-center justify-content-between">
          <Col>
            <h3 className={classNames(styles.appTitle, 'app-title')}>
              vaccify
            </h3>
          </Col>
          <Col className="flex-grow-0">
            <button
              className={styles.themeSwitcher}
              onClick={toggleThemeHandler}
            >
              {darkMode ? <Sun size="18" /> : <Moon size="18" />}
            </button>
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default AppHeader
