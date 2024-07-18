import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'

import { AuthContext } from './context/AuthContext'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="Pages">
          <Routes>
            <Route 
              path="/"
              element={ !user ? <Login /> : user.role === 'admin' ? <Navigate to='/admin'/> : <Navigate to='/home' /> }
            />
            <Route 
              path="/signup"
              element={ !user ? <Signup /> : user.role === 'admin' ? <Navigate to='/admin'/> : <Navigate to='/home' /> }
            />
            <Route 
              path="/login"
              element={ !user ? <Login /> : user.role === 'admin' ? <Navigate to='/admin'/> : <Navigate to='/home' /> }
            />
            <Route 
              path="/home"
              element={ user && user.role === 'user' ? <Home /> : <Navigate to='/login' /> }
            />
            <Route 
              path="/admin"
              element={ user && user.role === 'admin' ? <Admin /> : <Navigate to='/login' /> }
            />
            <Route 
              path='/admin-test'
              element={ <Admin /> }
            />
            <Route 
              path='home-test'
              element={ <Home /> }
            />
          </Routes>
        </div>  
      </BrowserRouter>
    </div>
  );
}

export default App;
