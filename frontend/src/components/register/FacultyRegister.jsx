// FacultyRegister.js
import React, { useState } from 'react';
import './FacultyRegister.css';
import { handleFacultyRegistration } from './registerService';

const FacultyRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    maxStudentAccounts: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    const status=handleFacultyRegistration(formData);
    setFormData({
      username: '',
      email: '',
      password: '',
      maxStudentAccounts: 0,
    })
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4 px-5">
            <h3 className="text-center mb-4 text-primary">Add Faculty Member</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter faculty name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter faculty email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Set a password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="maxStudentAccounts" className="form-label">Max Student Accounts</label>
                <input
                  type="number"
                  id="maxStudentAccounts"
                  name="maxStudentAccounts"
                  className="form-control"
                  value={formData.maxStudentAccounts}
                  onChange={handleChange}
                  placeholder="Enter limit"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary w-100">Add Faculty</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyRegister;
