import { FC } from "react";

export const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="max-w-[85rem] mx-auto">{children}</div>;
};
