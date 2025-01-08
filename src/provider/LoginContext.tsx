import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'


interface LoginUserType{
    isLoggedIn:boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export const LoginUserContext = createContext<LoginUserType | null>(null);

// Define the props for the provider component
interface LoginUserProviderProps {
    children: ReactNode; // Properly type the children prop
  }

const LoginContext: FC<LoginUserProviderProps> = ({children}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
  return (
    <LoginUserContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
    </LoginUserContext.Provider>
  )
}

export default LoginContext
