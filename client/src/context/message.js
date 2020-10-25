import React, { useContext, useReducer, createContext } from "react";

const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReducer = (state, action) => {
  console.log("action type is ", action.type);
  switch (action.type) {
    case "SET_USERS": {
      return {
        ...state,
        users: action.payload,
      };
    }
    case "ADD_REACTION": {
      console.log('payload is ', action.payload)
      const usersCopy = [...state.users];
      const userIndex = usersCopy.findIndex(u => u.username === action.payload.username);
      let userCopy = { ...usersCopy[userIndex] };

      const messageIndex = userCopy?.messages?.findIndex(
        (m) => m.uuid === action.payload.reaction.message.uuid
      );

      if (messageIndex > -1) {
        let messagesCopy = [...userCopy.messages];

        let reactionsCopy = [...messagesCopy[messageIndex].reactions];

        const reactionIndex = reactionsCopy.findIndex(
          (r) => r.uuid === action.payload.reaction.uuid
        );
        if (reactionIndex > -1) {
          reactionsCopy[reactionIndex] = action.payload.reaction;
        } else {
          reactionsCopy = [...reactionsCopy, action.payload.reaction];
        }
        messagesCopy[messageIndex] = {
          ...messagesCopy[messageIndex],
          reactions: reactionsCopy,
        };

        userCopy = {
          ...userCopy,
          messages: messagesCopy,
        };

        usersCopy[userIndex] = userCopy;

        return {
          ...state,
          users: usersCopy,
        };
      }
      break;
    }
    case "SET_SELECTED_USER": {
      const usersCopy = state.users.map((user) => ({
        ...user,
        selected: user.username === action.payload.username,
      }));
      return {
        ...state,
        users: usersCopy,
      };
    }
    case "SET_USER_MESSAGES": {
      const usersCopy = state.users.map((user) => {
        if (user.username === action.payload.username) {
          user.messages = action.payload.messages;
        }
        return user;
      });
      return {
        ...state,
        users: usersCopy,
      };
    }
    case "ADD_MESSAGE": {
      action.payload.message.reactions = [];
      const usersCopy = [...state.users];
      const userIndex = usersCopy.findIndex(
        (u) => u.username === action.payload.username
      );
      let newUser = {
        ...usersCopy[userIndex],
        messages: [...usersCopy[userIndex].messages, action.payload.message],
        latestMessage: action.payload.message,
      };
      console.log("new user is ", newUser);
      usersCopy[userIndex] = newUser;

      return {
        ...state,
        users: usersCopy,
      };
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
