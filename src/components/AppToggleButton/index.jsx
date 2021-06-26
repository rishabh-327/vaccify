import classnames from 'classnames'

import _s from './AppToggleButton.module.scss'

const AppToggleButton = props => {
  const { className, children, active, onClick } = props
  return (
    <button
      className={classnames('btn btn-sm', _s.appToggleButton, className, {
        [_s.active]: active,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default AppToggleButton
