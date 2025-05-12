import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { UserContext } from '../contexts/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? '' : 'Email is invalid.';
    temp.password = formData.password ? '' : 'Password is required.';
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
      const { data } = await api.post('/auth/login', {
        email: formData.email.toLowerCase(),
        password: formData.password,
      });
      setUser({ ...data.user, token: data.token });
      toast.success(`Welcome back, ${data.user.username}!`);
      setTimeout(() => {
        navigate(data.user.role === 'admin' ? '/admin' : '/user');
      }, 1200);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5 pt-5">
      <div className="card shadow-lg p-4 rounded-4 bg-dark text-white" style={{ minWidth: '400px' }}>
        <h2 className="text-center mb-4">Login to Parcel Tracker</h2>
        <form noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
