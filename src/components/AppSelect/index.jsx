import { useField } from 'formik'
import classname from 'classnames'
import _s from './AppSelect.module.scss'

const AppSelect = ({ label, className, ...props }) => {
  const [field, meta] = useField(props)

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
