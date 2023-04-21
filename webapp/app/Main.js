import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import HomeGuest from "./components/HomeGuest";
import Register from "./components/Register";
import Translate from "./components/Translate";
import Login from "./components/Login";

function Main() {
  return (
    <Router>
      <div className="container py-5">
        <h1 className="display-3">Translate app</h1>
        <Link to="/translate" className="btn btn-primary">Use translation app</Link>
      </div>
      <Routes>
        <Route path="/" element={<HomeGuest />} />
        <Route path="/register" element={<Register />} />
        <Route path="/translate" element={<Translate />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<Main />, document.querySelector("#app"));

// hot reloading
if (module.hot) {
  module.hot.accept();
}
