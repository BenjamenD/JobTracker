import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import LoginPage from './pages/LoginPage'
import JobPage from './pages/JobPage'
import UserPage from './pages/UserPage'
import ProtectedRoute from './auth/ProtectedRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>}/>
      <Route path="/job" element={<JobPage />}/>
    </Route>
  )
)

function App() {
  return (<RouterProvider router={router}/>)
}

export default App
