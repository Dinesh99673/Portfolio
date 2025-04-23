import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './components/Home/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import './App.css';
import Resume from './components/Resume/Resume';
import Project from './components/Project/Projects.jsx';
import ParticlesComponent from './components/Particle';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={`App h-screen `} > 
      <Router>
        <ParticlesComponent />
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Project" element={<Project />} />
          <Route path="/Resume" element={<Resume />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer/>
      </Router>
    </div>

  )
}

export default App
