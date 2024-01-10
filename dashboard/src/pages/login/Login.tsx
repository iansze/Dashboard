import React from "react";
import AuthForm from "../../components/auth/AuthForm";

type Props = {};

const Login = (props: Props) => {
  return (
    <>
      <div className="authContainer">
        <h1 className="authContainer__title">Login</h1>
        <AuthForm mode="login" />
      </div>
    </>
  );
};

export default Login;
