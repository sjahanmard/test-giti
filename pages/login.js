import LoginForm from "../components/LoginForm";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import Router from "next/router";

const Login = () => {
  const { token, expirationDate } = useContext(AuthContext);
  useEffect(() => {
    const x = new Date().getTime() - Number(expirationDate);
    if (x > 0) {
      Router.push("/panel");
    }
  }, [token, expirationDate]);

  return <LoginForm />;
};

export default Login;
