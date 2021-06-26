import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { CornerDownLeft } from 'react-feather'
import classnames from 'classnames'
import { cloneDeep } from 'lodash/lang'
import { AlertCircle } from 'react-feather'
import { Helmet } from 'react-helmet-async'

import AppToggleButton from '../../components/AppToggleButton'
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
    onlyAvailable: false,
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

  let daywiseAppointments = filteredAppointments.map(
    (appointmentsOnDate, idx) =>
      appointmentsOnDate.centers.length ? (
        <Row className="mb-5" key={idx}>
          <Col xs="12">
            <p className="mb-2">
              <strong>{appointmentsOnDate.date}</strong>
            </p>
          </Col>

          {appointmentsOnDate.centers.map(center => (
            <Col md="6" lg="4" key={center.center_id}>
              <VaccinationCenter center={center} />
            </Col>
          ))}
        </Row>
      ) : null
  )
  if (!daywiseAppointments.length) {
    daywiseAppointments = (
      <div className="d-flex">
        <div className="mr-2">
          <AlertCircle size="20" />
        </div>
        <div className="flex-grow-1">
          <h6 className="font-weight-bold">
            There is no appointment available matching the requested criteria.
          </h6>
          <h6 className="mt-4">
            Search with different criteria or apply different filter.
          </h6>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Appointments | vaccify</title>
      </Helmet>
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
              <AppToggleButton
                active={filter.fee.Free}
                onClick={() => toggleFeeFilter('Free')}
                className="mr-1"
              >
                Free
              </AppToggleButton>
              <AppToggleButton
                active={filter.fee.Paid}
                onClick={() => toggleFeeFilter('Paid')}
              >
                Paid
              </AppToggleButton>
            </div>

            <div className={_s.filterDivider}></div>

            <div className={_s.filterGroup}>
              <AppToggleButton
                active={filter.ageLimit[18]}
                onClick={() => toggleAgeLimitFilter(18)}
                className="mr-1"
              >
                For 18+
              </AppToggleButton>
              <AppToggleButton
                active={filter.ageLimit[45]}
                onClick={() => toggleAgeLimitFilter(45)}
              >
                For 45+
              </AppToggleButton>
            </div>

            <div className={_s.filterDivider}></div>

            <div className={_s.filterGroup}>
              <AppToggleButton
                active={filter.onlyAvailable}
                onClick={toggleAvailabilityFilter}
              >
                Only Available
              </AppToggleButton>
            </div>
          </div>
        </div>

        {appointmentsSlice.loading && <AppLoader />}
        {!appointmentsSlice.loading && daywiseAppointments}
      </div>
    </>
  )
}

export default Appointments

function filterAppointments(filter, appointments) {
  let filteredAppointments = []

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

  // Cleanup for dates with zero center
  filteredAppointments = filteredAppointments.filter(
    appointmentsOnDate => appointmentsOnDate.centers.length
  )
  return filteredAppointments
}
