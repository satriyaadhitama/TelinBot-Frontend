// Import Dependencies
import { useState, FormEvent, ChangeEvent, useEffect, useRef } from 'react';
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
import { login } from '@/services/auth';
import ErrorModal from '@/components/ErrorModal';
import { validateLogin } from '@/apps/auth/validations';

function Main() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  //  Menampung value dari input form
  const [input, setInput] = useState<UserLoginState>({
    email: '',
    password: '',
  });
  //  Menampung error message validasi form
  const [inputErrors, setInputErrors] = useState<UserLoginState>({
    email: '',
    password: '',
  });

  const [isErrorModalActive, setIsErrorModalActive] = useState(false);

  const dispatch: Dispatch = useDispatch();

  const errorModalToggler = () => {
    setIsErrorModalActive(!isErrorModalActive);
  };

  const handleSubmitEvent = async (e: FormEvent) => {
    e.preventDefault();

    const errorValidation = validateLogin(input);
    setInputErrors(errorValidation);

    const hasErrors = Object.values(inputErrors).some((value) => value !== '');

    if (!hasErrors) {
      try {
        const token = await login(input);
        dispatch(loginUser(token));
      } catch (error) {
        setIsErrorModalActive(true);
      }
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
      <div>
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
                  className={`form-control ${inputErrors.email ? 'error-input' : ''}`}
                  onChange={handleInput}
                />
              </div>
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
              {inputErrors.email && (
                <p className="input-error-message">{inputErrors.email}</p>
              )}
            </div>
            <div className="mb-3">
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faLock} className="form-control-icon" />
                <input
                  type="password"
                  id="password-input"
                  name="password"
                  placeholder="Password"
                  className={`form-control ${inputErrors.password ? 'error-input' : ''}`}
                  onChange={handleInput}
                />
                {inputErrors.password && (
                  <p className="input-error-message">{inputErrors.password}</p>
                )}
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
        {isErrorModalActive && (
          <ErrorModal
            errorTitle="Failed to Login"
            errorMessage="Please provide a valid input"
            onModalToggle={errorModalToggler}
          />
        )}
      </div>
    );
  }
}

export default Main;
