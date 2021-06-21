import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import styles from './App.module.scss'

import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import Home from './views/Home'
import Appointments from './views/Appointments'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    exact: true,
  },
  {
    name: 'Appointments',
    path: '/appointments',
    component: Appointments,
    exact: false,
  },
]

function App() {
  return (
    <Router>
      <AppHeader />

      <main className={styles.appContent}>
        <Container>
          {/* <Home /> */}
          {/* <Appointments /> */}
          <Switch>
            {routes.map(route => (
              <Route key={route.name} path={route.path} exact={route.exact}>
                {<route.component />}
              </Route>
            ))}
          </Switch>
        </Container>
      </main>

      <AppFooter />
    </Router>
  )
}

export default App
