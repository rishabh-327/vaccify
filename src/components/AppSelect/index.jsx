import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useField, useFormikContext } from 'formik'
import classname from 'classnames'

import _s from './AppSelect.module.scss'

import { actions as metaActions } from '../../store/metaSlice'

const AppSelect = ({ label, className, ...props }) => {
  const dispatch = useDispatch()

  const [field, meta] = useField(props)
  const {
    values: { state },
  } = useFormikContext()

  useEffect(() => {
    if (state) {
      dispatch(metaActions.getDistrictList(state))
    }
  }, [state, dispatch])

  return (
    <div className={classname(_s.appSelect, className)}>
      <label className={_s.appSelectLabel} htmlFor={props.id || props.name}>
        {label}
      </label>

      <select
        className={classname('form-control', _s.appSelectField)}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && (
        <div className={_s.appSelectErrorMessage}>{meta.error}</div>
      )}
    </div>
  )
}

export default AppSelect
