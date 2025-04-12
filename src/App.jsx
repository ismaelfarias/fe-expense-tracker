import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Incomes from './pages/Incomes'
import Expenses from './pages/Expenses'
import Categories from './pages/Categories'
import Login from './pages/Login'
import LogoutButton from './components/LogoutButton'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Router>
        {isAuthenticated && (
          <nav className='navbar'>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/incomes">Incomes</Link></li>
              <li><Link to="/expenses">Expenses</Link></li>
              <li><Link to="/categories">Categories</Link></li>
            </ul>
            <LogoutButton />
          </nav>
        )}

        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/incomes" element={
            <ProtectedRoute>
              <Incomes />
            </ProtectedRoute>
          } />
          <Route path="/expenses" element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          } />
          <Route path="/categories" element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          } />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App