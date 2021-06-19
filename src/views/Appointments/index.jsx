import { Row, Col } from 'react-bootstrap'
import { CornerDownLeft } from 'react-feather'
import classnames from 'classnames'

import AppSectionTitle from '../../components/AppSectionTitle'
import VaccinationCenter from '../../components/VaccinationCenter'

import _s from './Appointments.module.scss'
import './Appointments.scss'

const Appointments = () => {
  const centers = [
    {
      center_id: 593836,
      name: 'PHC KADODARA SUBCENTER',
      block_name: 'Palsana',
      district: 'Surat',
      pincode: 394327,
      fee_type: 'Free',
    },
    {
      center_id: 425658,
      name: 'Vadoli Subcenter',
      block_name: 'Bardoli',
      district: 'Surat',
      pincode: 394330,
      fee_type: 'Paid',
      vaccine_fees: [
        {
          vaccine: 'COVISHEILD',
          fee: 630,
        },
      ],
    },
    {
      center_id: 604710,
      name: 'Primary Health Center Kosamba',
      block_name: 'Mangrol',
      district: 'Surat',
      pincode: 394120,
      fee_type: 'Free',
    },
  ]
  return (
    <div id="appointments-page">
      <div className="d-flex justify-content-between align-items-center">
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
