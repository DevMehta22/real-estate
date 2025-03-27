import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import About from './Pages/About'
import Buyer from './Pages/Buyer'
import Seller from './Pages/Seller'
import Valuation from './Pages/Valuation'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/buyer" element={<Buyer/>}/>
          <Route path="/seller" element={<Seller/>}/>
          <Route path="/predict" element={<Valuation/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
