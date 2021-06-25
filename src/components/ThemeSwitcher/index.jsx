import useDarkMode from 'use-dark-mode'
import { Sun, Moon } from 'react-feather'

import _s from './ThemeSwitcher.module.scss'

const ThemeSwitcher = () => {
  const { value: isDarkActive, toggle } = useDarkMode(false, {
    classNameLight: 'light',
    classNameDark: 'dark',
  })

  return (
    <button className={_s.themeSwitcher} onClick={toggle}>
      {isDarkActive ? <Sun size="18" /> : <Moon size="18" />}
    </button>
  )
}

export default ThemeSwitcher
