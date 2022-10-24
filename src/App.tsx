import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegistrationPage, TodoListsPage  } from 'pages'
import './App.scss'
import { ProtectedRoute } from 'components/protected'
import { usersSelectors } from 'store'
import { useSelector } from 'react-redux'

function App() {
  const userEmail = useSelector(usersSelectors.currentUserEmail)

  return (
    <Routes>
      <Route path='/login' element={
        <ProtectedRoute condition={userEmail === ''} navigateTo='/todos'>
          <LoginPage />
        </ProtectedRoute>
      } />
      <Route path='/register' element={
        <ProtectedRoute condition={userEmail === ''} navigateTo='/todos'>
          <RegistrationPage />
        </ProtectedRoute>
      } />
      <Route path='/todos' element={
        <ProtectedRoute condition={userEmail !== ''} navigateTo='/login'>
          <TodoListsPage />
        </ProtectedRoute>
      } />
      <Route path='*' element={
        <Navigate to='/login' replace />
      }/>
    </Routes>
  )
}

export default App
