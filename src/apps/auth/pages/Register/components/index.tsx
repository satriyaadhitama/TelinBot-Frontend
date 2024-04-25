import PhoneInput from '@/components/PhoneInput';
import { register } from '@/services/auth';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobPosition: string;
  password: string;
  passwordConfirm: string;
}

const initialRegisterForm: RegisterForm = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  jobPosition: '',
  password: '',
  passwordConfirm: '',
};

function Main() {
  const navigate = useNavigate();

  const [formInputData, setFormInputData] =
    useState<RegisterForm>(initialRegisterForm);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormInputData({
      ...formInputData,
      [name]: value,
    });
  };

  const handlePhoneInput = (phoneNumber: string) => {
    setFormInputData({
      ...formInputData,
      phoneNumber: phoneNumber,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formInputData.password === formInputData.passwordConfirm) {
      // Form Data
      const formData = new FormData();
      formData.append('first_name', formInputData.firstName);
      formData.append('last_name', formInputData.lastName);
      formData.append('email', formInputData.email);
      formData.append('phone_number', formInputData.phoneNumber);
      formData.append('password', formInputData.password);
      formData.append('position', formInputData.jobPosition);
      // Register API
      await register(formData);
      navigate('/auth/login');
    }
  };

  return (
    <div className="auth-container d-flex flex-column p-5">
      <h1 className="text-color-primary text-center mb-4 fw-bold">REGISTER</h1>
      <form action="" className="d-flex flex-column" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              onChange={handleInput}
            />
          </div>
          <div className="col-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleInput}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <PhoneInput onChange={handlePhoneInput} />
        </div>
        <div className="mb-3">
          <label htmlFor="jobPosition" className="form-label">
            Job Position
          </label>
          <input
            type="text"
            className="form-control"
            id="jobPosition"
            name="jobPosition"
            onChange={handleInput}
          />
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInput}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <label htmlFor="passwordConfirm" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="form-control"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            I agree the{' '}
            <a href="" className="text-primary link-underline">
              term and conditions
            </a>
          </label>
        </div>
        <button type="submit" className="mt-3 button button-primary mt-2">
          Register Now
        </button>
        <div className="d-flex justify-content-center mt-4">
          <p style={{ fontSize: 14 }}>
            Already registered? &nbsp;
            <a href="/auth/login" className=" text-primary">
              Login here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Main;
