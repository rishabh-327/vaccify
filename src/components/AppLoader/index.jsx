import _s from './AppLoader.module.scss'

const AppLoader = () => {
  return (
    <div className={_s.spinner}>
      <div className={_s.doubleBounce1}></div>
      <div className={_s.doubleBounce2}></div>
    </div>
  )
}

export default AppLoader
