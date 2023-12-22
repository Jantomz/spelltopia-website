import { useAuthContext } from "./useAuthContext";
import { useWordlistsContext } from "./useWordlistsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: wordlistsDispatch } = useWordlistsContext();

  const logout = () => {
    localStorage.clear();

    dispatch({ type: "LOGOUT" });

    wordlistsDispatch({
      type: "SET_WORDLISTS",
      payload: null,
    });

    wordlistsDispatch({
      type: "SET_WORDLIST",
      payload: null,
    });
  };
  return { logout };
};
