import React from "react";
import { Link } from "react-router-dom";
import Page from "./Page";
import Register from "./Register";
import Login from "./Login";

function HomeGuest() {
  const handleButtonClick = () => {
    const registerComponent = document.querySelector("#register");
    if (registerComponent) {
      registerComponent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Page wide={true} title="Welcome to Translate Voice">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              className="img-fluid rounded"
              src="./public/images/girl-boy-talking.png"
              alt="Illustration"
            />
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <h1 className="mb-4">Welcome to Translate Voice</h1>
            <p>
              Translate Voice is a tool that helps you communicate with people
              who speak a different language. Whether you're traveling for
              vacation, speaking to someone who doesn't speak your language, or
              trying to understand instructions, Translate Voice has got you
              covered.
            </p>
            <p>
              With our app, you can easily translate your voice from one language
              to another, so you can be sure that you're understood no matter
              where you are or who you're speaking to. It's simple, fast, and
              accurate - try it out today!
            </p>
            <button
              type="button"
              className="btn btn-info shadow-hover text-center"
              onClick={handleButtonClick}
            >
              Try it now!
            </button>
            <Link
              to="/register"
              className="btn btn-secondary shadow-hover ms-2"
            >
              Register
            </Link>
          </div>
          <Login />
        </div>
      </Page>
    </>
  );
}

export default HomeGuest;
