// Import Dependencies
import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
// Import Assets
import TelkomselLogo from '@/assets/Telkomsel_2021_icon.svg.png';
// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
// Import Types
import type { Dispatch } from 'redux';
import { RootState } from '@/types/auth/RootState';
import { UserLoginState } from '@/types/auth/UserLoginState';
// Reducers
import { loginUser } from '@/reducers/auth';

function Main() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [input, setInput] = useState<UserLoginState>({
    email: '',
    password: '',
  });

  const dispatch: Dispatch = useDispatch();

  const handleSubmitEvent = (e: FormEvent) => {
    e.preventDefault();
    if (input.email !== '' && input.password !== '') {
      // Dispatch action
      dispatch(loginUser({ email: input.email, password: input.password }));
      navigate('/');
    } else {
      alert('Please provide a valid input');
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  } else {
    return (
      <div className="auth-container d-flex flex-column p-5">
        <h1 className="text-color-primary text-center mb-4 fw-bold">LOGIN</h1>
        <a href="/" className="align-self-center mb-4">
          <img
            src={TelkomselLogo}
            alt=""
            className=""
            style={{ width: '80px' }}
          />
        </a>
        <form onSubmit={handleSubmitEvent} className="d-flex flex-column">
          <div className="mb-4">
            <div className="input-with-icon">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="form-control-icon"
              />
              <input
                type="email"
                id="email-input"
                name="email"
                placeholder="Email Address"
                className="form-control"
                onChange={handleInput}
              />
            </div>
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <div className="input-with-icon">
              <FontAwesomeIcon icon={faLock} className="form-control-icon" />
              <input
                type="password"
                id="password-input"
                name="password"
                placeholder="Password"
                className="form-control"
                onChange={handleInput}
              />
            </div>
          </div>
          <button type="submit" className="button button-primary mt-2">
            Sign In
          </button>
        </form>
        <div className="d-flex justify-content-center mt-4">
          <p style={{ fontSize: 14 }}>
            Doesnt have account? &nbsp;
            <a href="/auth/register" className=" text-primary">
              Create account now
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Main;
