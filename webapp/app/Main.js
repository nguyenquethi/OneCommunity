import React from "react";
import ReactDOM from "react-dom/client";

import HomeGuest from "./components/HomeGuest";
import Register from "./components/Register";

function Main() {
  return (
    <>
      <div className="container py-5">
        <h1 className="display-3">Translate app</h1>
      </div>
      <HomeGuest />
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

// hot reloading
if (module.hot) {
  module.hot.accept();
}
