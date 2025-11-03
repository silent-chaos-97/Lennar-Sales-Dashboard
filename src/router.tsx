import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/main'

const router = createBrowserRouter([
  { path: '/', element: <MainLayout /> },
  { path: '*', element: <NotFound /> }
