import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import classnames from 'classnames'

import './Home.scss'
import _s from './Home.module.scss'

import AppSheet from '../../components/AppSheet'
import AppSectionTitle from '../../components/AppSectionTitle'
import DistrictSearchForm from '../../components/DistrictSearchForm'
import PincodeSearchForm from '../../components/PincodeSearchForm'

import { actions as metaActions } from '../../store/metaSlice'
import { actions as appointmentsActions } from '../../store/appointmentsSlice'

import states from '../../data/states'

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    // TODO:Replace with async action creater
    dispatch(metaActions.setStates({ states }))
  }, [dispatch])

  const searchHandler = (type, key, date) => {
    dispatch(appointmentsActions.setSearchParams({ type, key, date }))
    history.push('/appointments')
  }

  return (
    <section id="home-page">
      <Row className="justify-content-center py-md-5">
        <Col lg="10">
          <AppSheet className="py-md-5">
            <Row className="mx-0">
              <Col
                className={classnames(
                  _s.firstForm,
                  'px-0 px-md-3 py-3 py-md-0'
                )}
                md="6"
              >
                <Row className="justify-content-center">
                  <Col className="px-0" xs="11" sm="10" lg="8">
                    <div className="d-flex flex-column justify-content-between py-md-4">
                      <AppSectionTitle
                        className="mb-4"
                        title="Search By District"
                      />
                      <DistrictSearchForm searchHandler={searchHandler} />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="px-0 px-md-3 py-3 py-md-0" md="6">
                <Row className="justify-content-center h-100">
                  <Col className="px-0" xs="11" sm="10" lg="8">
                    <div className="d-flex flex-column justify-content-between h-100 py-md-4">
                      <AppSectionTitle
                        className="mb-4"
                        title="Search By Pincode"
                      />
                      <PincodeSearchForm searchHandler={searchHandler} />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </AppSheet>
        </Col>
      </Row>
    </section>
  )
}

export default Home
