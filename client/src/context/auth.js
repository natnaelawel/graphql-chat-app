import React, { useContext, useReducer, createContext } from "react";
import jwtDecode from 'jwt-decode'

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const token = localStorage.getItem('token')
let user = null;
if(token){
  const decodedToken = jwtDecode(token)
  const expiresAt = new Date(decodedToken.exp * 1000)
  console.log(expiresAt)
  if(new Date() > expiresAt){
    localStorage.removeItem('token')
  }else{
    user = decodedToken
  }
}else{
  console.log('token is not available ')
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");

      return {
        ...state,
        user: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user });
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);

/**
 * it is dispatch for authentication
 * @property( type, payload)
 */
export const useAuthDispatch = () => useContext(AuthDispatchContext);
