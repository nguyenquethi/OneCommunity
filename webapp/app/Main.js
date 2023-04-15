import React from "react";
import ReactDOM from "react-dom/client";

function Main() {
  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

// hot reloading
if (module.hot) {
  module.hot.accept();
}
