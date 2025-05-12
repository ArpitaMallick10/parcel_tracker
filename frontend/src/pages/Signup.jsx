import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { UserContext } from '../contexts/UserContext';

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    temp.username = formData.username ? '' : 'Username is required.';
    temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? '' : 'Email is invalid.';
    temp.password = formData.password.length >= 6 ? '' : 'Password must be at least 6 characters.';
    temp.role = formData.role ? '' : 'Role is required.';
    setErrors(temp);
    return Object.values(temp).every((x) => x === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await api.post('/auth/signup', formData);
      setUser({ ...data.user, token: data.token });
      toast.success('Signup successful! Redirecting...');
      setTimeout(() => {
        navigate(data.user.role === 'admin' ? '/admin' : '/user');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5 pt-5">
      <div className="card shadow-lg p-4 rounded-4 bg-dark text-white" style={{ minWidth: '400px' }}>
        <h2 className="text-center mb-4">Create an Account</h2>
        <form noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password (min 6 characters)
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete="new-password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="form-label">
              Register as
            </label>
            <select
              className={`form-select ${errors.role ? 'is-invalid' : ''}`}
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
