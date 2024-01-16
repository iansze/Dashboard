import AuthForm from "../../components/auth/AuthForm";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="authContainer">
        <h1 className="authContainer__title">Sign Up</h1>
        <AuthForm mode="signUp" />
        <div className="authContainer__link">
          <p className="authContainer__link-title">Don't have an account?</p>
          <Link to="/login" className="authContainer__link-text">
            Login Now!
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
