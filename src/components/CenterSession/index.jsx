import classnames from 'classnames'

import AppTag from '../AppTag'

import _s from './CenterSession.module.scss'

const CenterSession = props => {
  const { className, session } = props

  return (
    <div className={classnames(className, _s.centerSession)}>
      <div className={_s.vaccineInfo}>
        <AppTag>{session.vaccine}</AppTag>
        {session.fee && (
          <AppTag className="ml-2" variant="warning">
            ₹ {session.fee}
          </AppTag>
        )}
        <div className="flex-grow-1"></div>
        <AppTag variant="danger">{session.min_age_limit}+</AppTag>
      </div>
      <div className={_s.doseInfo}>
        <div>
          <h3>{session.available_capacity}</h3>
          <p className="p-0">
            <small>Available</small>
          </p>
        </div>
        <div>
          <h3>{session.available_capacity_dose1}</h3>
          <p className="p-0">
            <small>Dose 1</small>
          </p>
        </div>
        <div>
          <h3>{session.available_capacity_dose2}</h3>
          <p className="p-0">
            <small>Dose 2</small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CenterSession
