import classnames from 'classnames'

import _s from './AppTag.module.scss'

const AppTag = props => {
  const { className, children, variant } = props
  return (
    <div className={classnames(className, _s.apptag, variant)}>{children}</div>
  )
}

export default AppTag
