import { useState } from 'react'
import { Sun, Moon } from 'react-feather'

import _s from './ThemeSwitcher.module.scss'

const body = document.querySelector('body')

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false)

  function toggleThemeHandler() {
    body.classList.toggle('dark')
    body.classList.toggle('light')
    setDarkMode(!darkMode)
  }

  return (
    <button className={_s.themeSwitcher} onClick={toggleThemeHandler}>
      {darkMode ? <Sun size="18" /> : <Moon size="18" />}
    </button>
  )
}

export default ThemeSwitcher
