import { createContext } from "react";

export const LoginContext = createContext({
    user: null,
    setUser:(auth)=>{}
})