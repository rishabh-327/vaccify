import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { CornerDownLeft } from 'react-feather'
import { DateTime } from 'luxon'
import classnames from 'classnames'

import AppSectionTitle from '../../components/AppSectionTitle'
import VaccinationCenter from '../../components/VaccinationCenter'

import _s from './Appointments.module.scss'
import './Appointments.scss'

import { actions as appointmentActions } from '../../store/appointmentsSlice'

import apiData from '../../data/centers'

const Appointments = () => {
  const dispatch = useDispatch()

  const { appointmentsSlice } = useSelector(state => ({
    appointmentsSlice: state.appointments,
  }))

  useEffect(() => {
    dispatch(
      appointmentActions.setAppointments({
        appointments: getDatewiseAppointments(apiData),
      })
    )
  }, [appointmentsSlice.searchParams, dispatch])

  const daywiseAppointments = appointmentsSlice.appointments.map(
    (appointmentsOnDate, idx) => (
      <Row className="mb-5" key={idx}>
        <Col xs="12">
          <p className="mb-2">
            <strong>{appointmentsOnDate.date}</strong>
          </p>
        </Col>

        {appointmentsOnDate.centers.map(c => {
          return (
            <Col md="6" lg="4" key={c.center_id}>
              <VaccinationCenter center={c} />
            </Col>
          )
        })}
      </Row>
    )
  )

  return (
    <div id="appointments-page">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <AppSectionTitle title="Appointments" />

        <Link className={classnames('btn btn-sm', _s.backBtn)} to="/">
          <CornerDownLeft size="12" />
          <span className="ml-1">Back to search</span>
        </Link>
      </div>

      {daywiseAppointments}
    </div>
  )
}

export default Appointments

const getDatewiseAppointments = centers => {
  const datewiseCenters = {}

  for (let center of centers) {
    const datewiseSessions = {}

    for (let session of center.sessions) {
      if (!datewiseSessions[session.date]) datewiseSessions[session.date] = []
      datewiseSessions[session.date].push(session)
    }

    for (let date in datewiseSessions) {
      if (!datewiseCenters[date]) datewiseCenters[date] = []
      datewiseCenters[date].push({
        ...center,
        sessions: [...datewiseSessions[date]],
      })
    }
  }

  const datewiseCentersList = []
  for (let date in datewiseCenters) {
    datewiseCentersList.push({
      date: DateTime.fromFormat(date, 'dd-mm-yyyy').toFormat('d MMM yyyy, ccc'),
      centers: datewiseCenters[date].sort(
        (a, b) => a.sessions.length - b.sessions.length
      ),
    })
  }
  return datewiseCentersList
}
