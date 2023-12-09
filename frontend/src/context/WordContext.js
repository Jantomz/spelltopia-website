import { createContext, useReducer } from "react";

export const WordsContext = createContext();

export const wordsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORDS":
      return {
        words: action.payload,
      };
    case "CREATE_WORD":
      return {
        words: [action.payload, ...state.words],
      };
    default:
      return state;
  }
};

export const WordsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wordsReducer, {
    words: null,
  });

  return (
    <WordsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WordsContext.Provider>
  );
};
