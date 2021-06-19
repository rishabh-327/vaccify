import classnames from 'classnames'

import AppSheet from '../AppSheet'
import AppTag from '../AppTag'

import _s from './VaccinationCenter.module.scss'

const VaccinationCenter = ({ className, center }) => {
  const tagVariant =
    center.fee_type === 'Free'
      ? 'success'
      : center.fee_type === 'Paid'
      ? 'warning'
      : ''

  return (
    <AppSheet className={classnames(className)}>
      <h5 className={_s.centerTitle}>{center.name}</h5>
      <div className="d-flex align-items-start">
        <div className={_s.centerAddress}>
          <p>{`${center.block_name}, ${center.district}`}</p>
          <p>{center.pincode}</p>
        </div>
        <div className={_s.vaccineFees}>
          <AppTag variant={tagVariant}>{center.fee_type}</AppTag>
        </div>
      </div>
    </AppSheet>
  )
}

export default VaccinationCenter
