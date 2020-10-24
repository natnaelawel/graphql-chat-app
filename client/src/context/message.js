import React, { useContext, useReducer, createContext } from "react";

const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_SELECTED_USER": {
      const usersCopy = state.users.map((user) => ({
        ...user,
        selected: user.username === action.payload,
      }));
      return {
        ...state,
        users: usersCopy,
      };
    }
    case "SET_USER_MESSAGES":{
      const usersCopy = state.users.map((user) => {
        if (user.username === action.payload.username){
          user.messages = action.payload.messages
        } 
        return user;
      });
      return {
        ...state, 
        users: usersCopy
      }
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { users: null });
  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  );
};

export const useMessageState = () => useContext(MessageStateContext);

/**
 * it is dispatch for Messageentication
 * @property( type, payload)
 */
export const useMessageDispatch = () => useContext(MessageDispatchContext);
