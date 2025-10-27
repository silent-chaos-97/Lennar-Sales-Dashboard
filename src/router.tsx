import { createBrowserRouter } from 'react-router-dom'
import NotFound from './components/common/NotFound'

const router = createBrowserRouter([
  { path: '/', element: <MainLayout /> },
  { path: '*', element: <NotFound /> }
