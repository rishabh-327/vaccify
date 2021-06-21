import classnames from 'classnames'

import AppSheet from '../AppSheet'
import AppTag from '../AppTag'
import CenterSession from '../CenterSession'

import _s from './VaccinationCenter.module.scss'

const VaccinationCenter = ({ className, center }) => {
  const tagVariant =
    center.fee_type === 'Free'
      ? 'success'
      : center.fee_type === 'Paid'
      ? 'warning'
      : ''

  return (
    <AppSheet className={classnames(className, 'mb-2 mb-md-3')}>
      <h6 className={_s.centerTitle}>{center.name}</h6>
      <div className="d-flex align-items-start">
        <div className={_s.centerAddress}>
          <p>{`${center.block_name}, ${center.district_name}`}</p>
          <p>{center.pincode}</p>
        </div>
        <div className={_s.vaccineFees}>
          <AppTag variant={tagVariant}>{center.fee_type}</AppTag>
        </div>
      </div>
      <div className="mt-3">
        {center.sessions.map((session, idx) => {
          return (
            <CenterSession
              className={idx !== center.sessions.length - 1 ? 'mb-2' : null}
              session={session}
              key={session.session_id}
            />
          )
        })}
      </div>
    </AppSheet>
  )
}

export default VaccinationCenter
