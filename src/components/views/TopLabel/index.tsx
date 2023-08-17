"use client";

import ContextWrapper from "@/global/context";
import SubComp from "./comp/SubComp";

const TopLabel = () => {
  return (
    <ContextWrapper>
      <div className="flex items-center justify-between p-2 bg-slate-100 overflow-hidden">
        <div>
          <p className="font-semibold">Sign Up to get big deals!</p>
        </div>
        <SubComp />
      </div>
    </ContextWrapper>
  );
};

export default TopLabel;
