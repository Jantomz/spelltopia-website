import { createContext, useEffect, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const WordlistsContext = createContext();

export const wordlistsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORDLISTS":
      return {
        wordlists: action.payload,
      };
    case "CREATE_WORDLIST":
      return {
        wordlists: [action.payload, state.wordlists],
      };
    case "DELETE_WORDLIST":
      return {
        wordlists: state.wordlists.filter((w) => w._id !== action.payload._id),
      };
    case "SET_WORDLIST":
      return {
        wordlist: action.payload,
      };
    default:
      return state;
  }
};

export const WordlistsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wordlistsReducer, {
    wordlist: null,
    wordlists: null,
  });

  return (
    <WordlistsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WordlistsContext.Provider>
  );
};
