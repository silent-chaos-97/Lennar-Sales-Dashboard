import { RouterProvider } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/theme/theme'
import router from './router'
import { StateProvider } from './contexts/StateContext'
import { TimerProvider } from './contexts/TimerContext'
import { ScreenContextProvider } from './contexts/ScreenContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
