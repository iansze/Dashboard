import AuthForm from "../../components/auth/AuthForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="authContainer">
        <h1 className="authContainer__title">Login</h1>
        <AuthForm mode="login" />
        <p className="authContainer__link">
          Don't have an account?{" "}
          <Link to="/sign-up" className="authContainer__link-text">
            Sign Up Now!
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
