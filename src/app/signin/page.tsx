import SignInComp from "@/components/views/SignIn";
import ContextWrapper from "@/global/context";
import React from "react";

const Signin = () => {
  return (
    <ContextWrapper>
      <SignInComp />
    </ContextWrapper>
  );
};

export default Signin;
