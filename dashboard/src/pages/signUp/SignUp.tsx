import AuthForm from "../../components/auth/AuthForm";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="authContainer">
        <h1 className="authContainer__title">Sign Up</h1>
        <AuthForm mode="signUp" />
        <p className="authContainer__link">
          Already have an account?{" "}
          <Link to="/login" className="authContainer__link-text">
            Login Now!
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
