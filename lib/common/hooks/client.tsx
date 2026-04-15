import { createContext, useContext } from "react";
import { APIClientOptions } from "../api";

export const APIClientOptionsContext = createContext<
  APIClientOptions | undefined
>(undefined);

export const useAPIClientOptions = () => {
  const ctx = useContext(APIClientOptionsContext);

  return ctx;
};
