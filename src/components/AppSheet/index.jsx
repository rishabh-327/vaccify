import styles from './AppSheet.module.scss'
import classnames from 'classnames'

const AppSheet = ({ children, className }) => {
  return (
    <div className={classnames(styles.appSheet, className)}>{children}</div>
  )
}

export default AppSheet
