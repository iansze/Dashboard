import AuthForm from "../../components/auth/AuthForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="authContainer">
        <h1 className="authContainer__title">Login</h1>
        <AuthForm mode="login" />
        <div className="authContainer__link">
          <p className="authContainer__link-title">Don't have an account?</p>
          <Link to="/sign-up" className="authContainer__link-text">
            Sign Up Now!
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
