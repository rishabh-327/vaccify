import _s from './AppSectionTitle.module.scss'

const AppSectionTitle = ({ className, title }) => {
  return (
    <div className={className}>
      <h4>{title}</h4>
      <hr className={_s.appSectionTitleBar} />
    </div>
  )
}

export default AppSectionTitle
