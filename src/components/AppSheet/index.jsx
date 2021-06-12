import styles from './AppSheet.module.scss'

const AppSheet = ({children}) => {
  return <div className={styles.appSheet}>{children}</div>
}

export default AppSheet
