import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Output from './components/Output';


const App = () => {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/output" element={<Output />} />
        </Routes>
      </Router>
  );
};

export default App;