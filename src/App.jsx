import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import styles from './App.module.scss'

import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import Home from './views/Home'
import Appointments from './views/Appointments'

import store from './store'

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
    <Provider store={store}>
      <Router>
        <AppHeader />

        <main className={styles.appContent}>
          <Container>
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
    </Provider>
  )
}

export default App
