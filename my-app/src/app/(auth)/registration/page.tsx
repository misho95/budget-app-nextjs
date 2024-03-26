import RegForm from "@/app/ui/auth/reg.form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration",
};

const Registration = () => {
  return <RegForm />;
};

export default Registration;
