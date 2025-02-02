import React, { useState } from 'react';
// import './MyForm.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  password: string;
  confirmPassword: string;
  gender: string;
  agreeToTerms: boolean;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    password: '',
    confirmPassword: '',
    gender: '',
    agreeToTerms: false,
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = (): boolean => {
    let validationErrors: { [key: string]: string } = {};

    // Name validation
    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }

    // Email validation
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email is not valid';
    }

    // Phone validation
    if (!formData.phone) {
      validationErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = 'Phone number must be 10 digits';
    }

    // Address validation
    if (!formData.address) {
      validationErrors.address = 'Address is required';
    }

    // Date of Birth validation (must be a past date)
    if (!formData.dob) {
      validationErrors.dob = 'Date of Birth is required';
    } else if (new Date(formData.dob) >= new Date()) {
      validationErrors.dob = 'Date of Birth must be a past date';
    }

    // Password validation
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      validationErrors.password = 'Password must contain at least 8 characters, one uppercase letter, one number, and one special character';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    // Gender validation
    if (!formData.gender) {
      validationErrors.gender = 'Gender is required';
    }

    // Agree to Terms validation
    if (!formData.agreeToTerms) {
      validationErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      // Perform actual form submission here
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Sign Up</h2>

        <div className="form-field">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="phone" className="form-label">Phone Number:</label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
          />
          {errors.address && <p className="form-error">{errors.address}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="dob" className="form-label">Date of Birth:</label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="form-input"
          />
          {errors.dob && <p className="form-error">{errors.dob}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
          {errors.password && <p className="form-error">{errors.password}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input"
          />
          {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="gender" className="form-label">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="form-error">{errors.gender}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="agreeToTerms" className="form-label">
            <input
              id="agreeToTerms"
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="form-checkbox"
            />
            I agree to the terms and conditions
          </label>
          {errors.agreeToTerms && <p className="form-error">{errors.agreeToTerms}</p>}
        </div>

        <button type="submit" className="form-submit">Submit</button>
      </form>
    </div>
  );
};

export default MyForm;
