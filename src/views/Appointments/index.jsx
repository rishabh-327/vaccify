import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { CornerDownLeft } from 'react-feather'
import classnames from 'classnames'

import AppLoader from '../../components/AppLoader'
import AppSectionTitle from '../../components/AppSectionTitle'
import VaccinationCenter from '../../components/VaccinationCenter'

import _s from './Appointments.module.scss'
import './Appointments.scss'

import { actions as appointmentActions } from '../../store/appointmentsSlice'

const Appointments = () => {
  const dispatch = useDispatch()
  const { replace } = useHistory()

  const { appointmentsSlice } = useSelector(state => ({
    appointmentsSlice: state.appointments,
  }))

  useEffect(() => {
    if (
      !appointmentsSlice.searchParams.type ||
      !appointmentsSlice.searchParams.key ||
      !appointmentsSlice.searchParams.date
    ) {
      return replace('/')
    }
    dispatch(appointmentActions.getAppointments())
  }, [appointmentsSlice.searchParams, dispatch, replace])

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

      {appointmentsSlice.loading && <AppLoader />}
      {!appointmentsSlice.loading && daywiseAppointments}
    </div>
  )
}

export default Appointments
