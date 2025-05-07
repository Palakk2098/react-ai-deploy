import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
