import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Incomes from './pages/Incomes'
import Expenses from './pages/Expenses'
import Categories from './pages/Categories'

function App() {

  return (
    <>
      <Header />
      <Router>
        <nav className='navbar'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/incomes">Incomes</Link></li>
            <li><Link to="/expenses">Expenses</Link></li>
            <li><Link to="/categories">Categories</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
