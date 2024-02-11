import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Signup from './components/Signup'
import Login from './components/Login'
import UserPage from './components/UserPage'
import AdminPage from './components/AdminPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="Pages">
          <Routes>
            <Route 
              path="/"
              element={ <Signup /> }
            />
            <Route 
              path="/signup"
              element={ <Signup /> }
            />
            <Route 
              path="/login"
              element={ <Login /> }
            />
            <Route 
              path="/user"
              element={ <UserPage /> }
            />
            <Route 
              path="/admin"
              element={ <AdminPage /> }
            />
          </Routes>
        </div>  
      </BrowserRouter>
    </div>
  );
}

export default App;
