import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes from react-router-dom

import Splash from './pages/SplashPage';
import InvoicePage from './pages/InvoicePage';

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Router */}
        <Route path="/" element={<Splash />} /> {/* Use element prop instead of component */}
        <Route path="/invoicepage" element={<InvoicePage />} /> {/* Use element prop instead of component */}
      </Routes>
    </Router>
  );
}

export default App;
