import TelkomselLogo from '@/assets/Telkomsel_2021_icon.svg.png';
import InputFormIcon from '@/components/InputFormIcon';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

function Main() {
  return (
    <div className="auth-container d-flex flex-column p-5">
      <h1 className="text-color-primary text-center mb-4 fw-bold">Sign In</h1>
      <a href="/" className="align-self-center mb-4">
        <img
          src={TelkomselLogo}
          alt=""
          className=""
          style={{ width: '80px' }}
        />
      </a>
      <form className="d-flex flex-column">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <InputFormIcon type="text" id="env" icon={faEnvelope} />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <InputFormIcon type="password" id="inputPassword" icon={faLock} />
        </div>
        <button type="submit" className="button button-primary mt-2">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Main;
