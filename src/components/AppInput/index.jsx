import { useField } from 'formik'
import classname from 'classnames'
import _s from './AppInput.module.scss'

const AppInput = ({ label, className, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className={classname(_s.appInput, className)}>
      <label className={_s.appInputLabel} htmlFor={props.id || props.name}>
        {label}
      </label>

      <input className={_s.appInputField} {...field} {...props} />

      {meta.touched && meta.error && (
        <div className={_s.appInputErrorMessage}>{meta.error}</div>
      )}
    </div>
  )
}

export default AppInput
