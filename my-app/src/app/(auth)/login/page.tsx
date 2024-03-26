import { Metadata } from "next";
import LoginForm from "@/app/ui/auth/login.form";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return <LoginForm />;
};

export default Login;
