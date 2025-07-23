import { useState } from "react";
import "./SignUp.css";

function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    secondname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === formData.email);
    if (userExists) {
      alert("Email already registered");
      return;
    }

    users.push({
      firstname: formData.firstname,
      secondname: formData.secondname,
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");

  }

  return (
    <div>
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <div className="sign-up-inputs">
          <h1 id="signup-header">Register Here</h1>
          <label>First Name</label><br />
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required /><br />

          <label>Second Name</label><br />
          <input type="text" name="secondname" value={formData.secondname} onChange={handleChange} required /><br />

          <label>Email</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br />

          <label>Password</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} required /><br />

          <label>Confirm Password</label><br />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required /><br />

          <button type="submit" id="btn">Sign Up!</button>
          <p>Already have an account?<a href="#login"> Back to Login </a></p>
        </div>

        <div className="sign-up-image">
          <img src="https://st5.depositphotos.com/1558912/64667/i/450/depositphotos_646673554-stock-photo-easter-food-background-white-plate.jpg" alt="Fried salmon" />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
