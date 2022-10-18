import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegistrationPage, TodoListsPage  } from 'pages'
import './App.scss'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegistrationPage />} />
      <Route path='/todos' element={<TodoListsPage />} />
      <Route path='*' element={
        <Navigate to='/login' replace />
      }/>
    </Routes>
  )
}

export default App
