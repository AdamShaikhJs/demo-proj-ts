import React, { useState } from 'react';

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

const MyForm2: React.FC = () => {
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

    if (name === 'phone') {
      const phoneValue = value.replace(/\D/g, ''); 
      setFormData({
        ...formData,
        [name]: phoneValue,
      });
    } else if (name === 'password' || name === 'confirmPassword') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }

    // Perform onChange validation
    validate(name, value);
  };

  const validate = (field: string, value: string): void => {
    let validationErrors: { [key: string]: string } = { ...errors };

    switch (field) {
      case 'name':
        if (!value) {
          validationErrors.name = 'Name is required';
        } else {
          delete validationErrors.name;
        }
        break;

      case 'email':
        if (!value) {
          validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          validationErrors.email = 'Email is not valid';
        } else {
          delete validationErrors.email;
        }
        break;

      case 'phone':
        if (!value) {
          validationErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value)) {
          validationErrors.phone = 'Phone number must be 10 digits';
        } else {
          delete validationErrors.phone;
        }
        break;

      case 'address':
        if (!value) {
          validationErrors.address = 'Address is required';
        } else {
          delete validationErrors.address;
        }
        break;

      case 'dob':
        if (!value) {
          validationErrors.dob = 'Date of Birth is required';
        } else if (new Date(value) >= new Date()) {
          validationErrors.dob = 'Date of Birth must be a past date';
        } else {
          delete validationErrors.dob;
        }
        break;

      case 'password':
        if (!value) {
          validationErrors.password = 'Password is required';
        } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(value)) {
          validationErrors.password = 'Password must contain at least 8 characters, one uppercase letter, one number, and one special character';
        } else {
          delete validationErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          validationErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete validationErrors.confirmPassword;
        }
        break;

      case 'gender':
        if (!value) {
          validationErrors.gender = 'Gender is required';
        } else {
          delete validationErrors.gender;
        }
        break;

      case 'agreeToTerms':
        if (!value) {
          validationErrors.agreeToTerms = 'You must agree to the terms and conditions';
        } else {
          delete validationErrors.agreeToTerms;
        }
        break;

      default:
        break;
    }

    setErrors(validationErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the entire form before submission
    validateForm();
  };

  const validateForm = (): void => {
    let formIsValid = true;
    const validationErrors: { [key: string]: string } = {};

    for (const field in formData) {
      if (formData.hasOwnProperty(field)) {
        const value = formData[field as keyof FormData];
        validate(field, value);
        if (errors[field]) {
          formIsValid = false;
        }
      }
    }

    if (formIsValid) {
      console.log('Form submitted:', formData);
      // Perform actual form submission here
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Form Validation onChange</h2>

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
            maxLength={10}
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

export default MyForm2;
