import SignupComp from "@/components/views/Signup";
import ContextWrapper from "@/global/context";

const Signup = () => {
  return (
    <ContextWrapper>
      <SignupComp />
    </ContextWrapper>
  );
};

export default Signup;
