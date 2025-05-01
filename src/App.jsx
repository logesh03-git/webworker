import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WithWorker from './pages/WithWorker';
import NoWorker from './pages/NoWorker';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <nav style={{ padding: 10 }}>
        <Link to="/no-worker" style={{ marginRight: 10 }}>Without Worker</Link>
        <Link to="/with-worker">With Worker</Link>
      </nav>
      <ToastContainer />
      <Routes>
        <Route path="/no-worker" element={<NoWorker />} />
        <Route path="/with-worker" element={<WithWorker />} />
      </Routes>
    </Router>
  );
}

export default App;
