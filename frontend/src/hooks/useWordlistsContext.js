import { WordlistsContext } from "../context/WordlistContext";
import { useContext } from "react";

export const useWordlistsContext = () => {
  const context = useContext(WordlistsContext);

  if (!context) {
    throw Error(
      "useWordlistsContext must be used inside a WordlistsContextProvider"
    );
  }

  return context;
};
