
import { Routes, Route    } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Natiq from './Pages/Natiq/Natiq';
import Navbar from './Components/Navbar/Navbar';



function App() {

  return (
    <>
      <Navbar />
      <div className="container mx-auto text-center px-4 py-10">

      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/home" element={<Redirect to="/" />} /> */}
        <Route path="/about" element={<About/>} />
        <Route path="/natiq" element={<Natiq />} />
      </Routes>
      </div>
    </>
  )
}

export default App
