import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Output from './components/Output';
import WaveBackground from './components/WaveBackground';
import Geminiapi from './components/Geminiapi';


const App = () => {
  return (
      <Router>
        <Header />
        <WaveBackground />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/output" element={<Output />} />
          <Route path="/geminiapi" element={<Geminiapi />} />
        </Routes>
      </Router>
  );
};

export default App;