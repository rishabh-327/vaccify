import _s from './AppSectionTitle.module.scss'

const AppSectionTitle = ({ title }) => {
  return (
    <>
      <h4>{title}</h4>
      <hr className={_s.appSectionTitleBar} />
    </>
  )
}

export default AppSectionTitle
