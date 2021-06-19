import { Row, Col } from 'react-bootstrap'
import { CornerDownLeft } from 'react-feather'
import classnames from 'classnames'

import AppSectionTitle from '../../components/AppSectionTitle'
import VaccinationCenter from '../../components/VaccinationCenter'

import _s from './Appointments.module.scss'
import './Appointments.scss'

import centersData from '../../data/centers'

const Appointments = () => {
  const centers = centersData
  return (
    <div id="appointments-page">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <AppSectionTitle title="Appointments" />

        <button className={classnames('btn btn-sm', _s.backBtn)}>
          <CornerDownLeft size="12" />
          <span className="ml-1">Back to search</span>
        </button>
      </div>

      <Row>
        <Col xs="12">
          <p className="mb-2">20 June 2021</p>
        </Col>
        {centers.map(center => {
          return (
            <Col md="6" lg="4" key={center.center_id}>
              <VaccinationCenter center={center} />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Appointments
