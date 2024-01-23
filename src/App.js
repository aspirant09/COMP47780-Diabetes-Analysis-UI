// App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUpload from './FileUpload';
import Details from './Details'; // Import your Details component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // Use state to manage the received data
  const [jsonData, setJsonData] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Daibetes Drug Analysis</h1>
      </header>
      <main>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<FileUpload onDataReceived={(data) => setJsonData(data)} />}
            />
            <Route path="/details" element={<Details jsonData={jsonData} />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
