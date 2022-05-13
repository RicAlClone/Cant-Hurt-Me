import React,{createContext,useState,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import {SpinnerRoundOutlined} from 'spinners-react';

export const AuthContext = createContext();

export default ({children})=>{
  const [user,setUser]= useState(null);
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [isLoaded, setIsLoaded]=useState(false);

  useEffect(()=>{
    AuthService.isAuthenticated()
    .then(data=>{
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    })

  },[]);

  return(
    <div>
      {!isLoaded?
        <h1 style={{textAlign:'center',marginTop:'60px'}}>Loading <SpinnerRoundOutlined size ='100px'/></h1>

      :

        <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
          {children}
        </AuthContext.Provider>}
    </div>
  );
}
