// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Retailer from './pages/Retailer';
import Wholesaler from './pages/Wholesaler';
import Distributor from './pages/Distributor';
import Factory from './pages/Factory';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Beer Distribution Game</h1>
                <Routes>
                    <Route path="/retailer" element={<Retailer />} />
                    <Route path="/wholesaler" element={<Wholesaler />} />
                    <Route path="/distributor" element={<Distributor />} />
                    <Route path="/factory" element={<Factory />} />
                    <Route path="/" exact>
                        <h2>Welcome to the Beer Distribution Game</h2>
                        {/* Add a navigation menu or instructions */}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
