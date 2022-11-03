import { store } from "@/app/store";
import React, { FC, useEffect } from "react";

export type AppDispatch = typeof store.dispatch;

type PropsPrefetch = {
  children?: React.ReactNode;
};

const Prefetch: FC<PropsPrefetch> = ({ children }) => {
  return <>{children}</>;
};

export default Prefetch;
