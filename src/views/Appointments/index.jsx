import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import { CornerDownLeft } from 'react-feather'
import classnames from 'classnames'
import { cloneDeep } from 'lodash/lang'

import AppLoader from '../../components/AppLoader'
import AppSectionTitle from '../../components/AppSectionTitle'
import VaccinationCenter from '../../components/VaccinationCenter'

import _s from './Appointments.module.scss'
import './Appointments.scss'

import { actions as appointmentActions } from '../../store/appointmentsSlice'

const Appointments = () => {
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [filter, setFilter] = useState({
    fee: {
      Free: true,
      Paid: true,
    },
    onlyAvailable: true,
    ageLimit: {
      18: true,
      45: true,
    },
  })

  const dispatch = useDispatch()
  const { replace } = useHistory()

  const searchSlice = useSelector(state => state.search)
  const appointmentsSlice = useSelector(state => state.appointments)

  const toggleFeeFilter = type => {
    setFilter({ ...filter, fee: { ...filter.fee, [type]: !filter.fee[type] } })
  }
  const toggleAgeLimitFilter = age => {
    setFilter({
      ...filter,
      ageLimit: { ...filter.ageLimit, [age]: !filter.ageLimit[age] },
    })
  }
  const toggleAvailabilityFilter = () => {
    setFilter({ ...filter, onlyAvailable: !filter.onlyAvailable })
  }

  useEffect(() => {
    if (!searchSlice.type) return replace('/')

    dispatch(appointmentActions.getAppointments())
  }, [searchSlice, dispatch, replace])

  useEffect(() => {
    const filterResult = filterAppointments(
      filter,
      cloneDeep(appointmentsSlice.appointments)
    )
    setFilteredAppointments(filterResult)
  }, [filter, appointmentsSlice.appointments])

  const daywiseAppointments = filteredAppointments.map(
    (appointmentsOnDate, idx) =>
      appointmentsOnDate.centers.length > 0 ? (
        <Row className="mb-5" key={idx}>
          <Col xs="12">
            <p className="mb-2">
              <strong>{appointmentsOnDate.date}</strong>
            </p>
          </Col>

          {appointmentsOnDate.centers.map(center => {
            return center.sessions.length ? (
              <Col md="6" lg="4" key={center.center_id}>
                <VaccinationCenter center={center} />
              </Col>
            ) : null
          })}
        </Row>
      ) : null
  )

  return (
    <div id="appointments-page">
      <div className="d-flex justify-content-between align-items-center">
        <AppSectionTitle title="Appointments" />

        <Link className={classnames('btn btn-sm', _s.backBtn)} to="/">
          <CornerDownLeft size="12" />
          <span className="ml-1">Back to search</span>
        </Link>
      </div>
      <div className="mt-4 mb-5">
        <p className="px-2 m-0">Filters</p>
        <div className="d-flex flex-wrap align-items-center">
          <div className={_s.filterGroup}>
            <Button
              className={classnames('px-4 mr-1', _s.filterToggleButton, {
                active: filter.fee.Free,
              })}
              size="sm"
              onClick={() => toggleFeeFilter('Free')}
            >
              Free
            </Button>
            <Button
              className={classnames('px-4', _s.filterToggleButton, {
                active: filter.fee.Paid,
              })}
              variant="primary"
              size="sm"
              onClick={() => toggleFeeFilter('Paid')}
            >
              Paid
            </Button>
          </div>
          <div className={_s.filterDivider}></div>
          <div className={_s.filterGroup}>
            <Button
              className={classnames('px-4 mr-1', _s.filterToggleButton, {
                active: filter.ageLimit[18],
              })}
              variant="primary"
              size="sm"
              onClick={() => toggleAgeLimitFilter(18)}
            >
              For 18+
            </Button>
            <Button
              className={classnames('px-4', _s.filterToggleButton, {
                active: filter.ageLimit[45],
              })}
              variant="primary"
              size="sm"
              onClick={() => toggleAgeLimitFilter(45)}
            >
              For 45+
            </Button>
          </div>
          <div className={_s.filterDivider}></div>
          <div className={_s.filterGroup}>
            <Button
              className={classnames('px-4', _s.filterToggleButton, {
                active: filter.onlyAvailable,
              })}
              variant="primary"
              size="sm"
              onClick={toggleAvailabilityFilter}
            >
              Only Available
            </Button>
          </div>
        </div>
      </div>

      {appointmentsSlice.loading && <AppLoader />}
      {!appointmentsSlice.loading && daywiseAppointments}
    </div>
  )
}

export default Appointments

function filterAppointments(filter, appointments) {
  const filteredAppointments = []

  // filter for 'Free/Paid'
  appointments.forEach(appointmentsOnDate => {
    filteredAppointments.push({
      date: appointmentsOnDate.date,
      centers: appointmentsOnDate.centers.filter(
        center => filter.fee[center.fee_type]
      ),
    })
  })

  // filter for 'Availability' and 'Age Limit'
  filteredAppointments.forEach(appointmentsOnDate => {
    appointmentsOnDate.centers.forEach(center => {
      center.sessions = center.sessions.filter(session => {
        return filter.onlyAvailable
          ? session.available_capacity && filter.ageLimit[session.min_age_limit]
          : filter.ageLimit[session.min_age_limit]
      })
    })

    // Cleanup for centers with zero session
    appointmentsOnDate.centers = appointmentsOnDate.centers.filter(
      center => center.sessions.length
    )

    // Sort by the number of sessions in each session for better ordered layout
    appointmentsOnDate.centers.sort(
      (a, b) => a.sessions.length - b.sessions.length
    )
  })
  return filteredAppointments
}
