import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useField, useFormikContext } from 'formik'
import classname from 'classnames'

import _s from './AppSelect.module.scss'

import { actions as metaActions } from '../../store/metaSlice'
import districts from '../../data/districts'

const AppSelect = ({ label, className, ...props }) => {
  const dispatch = useDispatch()

  const [field, meta] = useField(props)
  const {
    values: { state },
  } = useFormikContext()

  useEffect(() => {
    if (state) {
      console.log('Make API request here and update the redux store.')
      // TODO:Replace with async action creater
      dispatch(metaActions.setDistricts({ districts }))
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
