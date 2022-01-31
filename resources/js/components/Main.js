import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './SignIn';

function Main() {
    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route path="/" element={<SignIn />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
