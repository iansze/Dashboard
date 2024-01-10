import React from "react";
import AuthForm from "../../components/auth/AuthForm";

type Props = {};

const SignUp = (props: Props) => {
  return (
    <>
      <div className="authContainer">
        <h1 className="authContainer__title">Sign Up</h1>
        <AuthForm mode="signUp" />
      </div>
    </>
  );
};

export default SignUp;
