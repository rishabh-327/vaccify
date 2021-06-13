import { useEffect } from 'react'
import { useField, useFormikContext } from 'formik'
import classname from 'classnames'
import _s from './AppSelect.module.scss'

const AppSelect = ({ label, className, ...props }) => {
  const [field, meta] = useField(props)
  const {
    values: { state },
  } = useFormikContext()

  useEffect(() => {
    console.log(state)
    if (state) {
      // Fetch district information through API request and store in the Redux store.
      console.log('Make API request here and update the redux store.')
    }
  }, [state])

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
