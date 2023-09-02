import React, { useState } from "react";
import { Navigate } from "react-router-dom";
const BACKEND_URL = process.env.BACKEND_URL;

const SignUp = () => {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

 


  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = formData;
    if(!name || !email || !password || !cpassword){
      setError("please fill all details");
      return ;

    }

    setError("");

    const res = await fetch(`${BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });

    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("invalid registration");
    } else {
      window.alert("Registration successful");
      console.log("successful Registration");
      setRegistrationSuccess(true); 
    }

      setFormData({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });

      
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        
        <form method="POST" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="name">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="cpassword">
              Confirm password
            </label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            onClick={PostData}
          >
            Sign Up
          </button>
        </form>
        {registrationSuccess && <Navigate to="/LoginPage" />}

      </div>
    </div>
  );
};

export default SignUp;
