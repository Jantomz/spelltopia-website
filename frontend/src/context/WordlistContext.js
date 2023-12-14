import { createContext, useReducer } from "react";

export const WordlistsContext = createContext();

export const wordlistsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORDLISTS":
      if (action.payload) {
        return {
          ownedWordlists: action.payload.owned,
          contributedWordlists: action.payload.contributed,
          assignedWordlists: action.payload.assigned,
        };
      } else {
        return {
          ownedWordlists: null,
          contributedWordlists: null,
          assignedWordlists: null,
        };
      }
    case "CREATE_WORDLIST":
      return {
        ownedWordlists: [action.payload, ...state.ownedWordlists],
      };
    case "DELETE_WORDLIST":
      return {
        ownedWordlists: state.ownedWordlists.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    // can implement these later
    case "SET_WORDLIST_USERS":
      return {
        users: action.payload,
      };
    case "ADD_WORDLIST_USER":
      return {
        users: [action.payload, ...state.users],
      };
    case "SET_WORDLIST_CONTRIBUTORS":
      return {
        contributors: action.payload,
      };
    case "ADD_WORDLIST_CONTRIBUTOR":
      return {
        contributors: [action.payload, ...state.contributors],
      };
    default:
      return state;
  }
};

export const WordlistsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wordlistsReducer, {
    ownedWordlists: null,
    assignedWordlists: null,
    contributedWordlists: null,
    users: null,
    contributors: null,
  });

  return (
    <WordlistsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WordlistsContext.Provider>
  );
};
