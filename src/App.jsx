import { Container } from 'react-bootstrap'

import styles from './App.module.scss'

import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
// import Home from './views/Home'
import Appointments from './views/Appointments'

function App() {
  return (
    <>
      <AppHeader />

      <main className={styles.appContent}>
        <Container>
          {/* <Home /> */}
          <Appointments />
        </Container>
      </main>

      <AppFooter />
    </>
  )
}

export default App
