import { useAuthContext } from "./useAuthContext";
import { useWordlistsContext } from "./useWordlistsContext";
import { useWordsContext } from "./useWordsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: wordsDispatch } = useWordsContext();
  const { dispatch: wordlistsDispatch } = useWordlistsContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });

    wordsDispatch({ type: "SET_WORDS", payload: null });
    wordlistsDispatch({ type: "SET_WORDLISTS", payload: null });
  };
  return { logout };
};
