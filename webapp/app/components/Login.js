import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(response.data);

      if (response.data.status === "success") {
        // Save the token to local storage
        localStorage.setItem("token", response.data.token);
        console.log("Token saved to local storage");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card w-50 mx-auto mt-5">
      <div className="card-body">
        <h1 className="card-title mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Login
          </button>
        </form>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
