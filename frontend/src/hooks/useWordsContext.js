import { WordsContext } from "../context/WordContext";
import { useContext } from "react";

export const useWordsContext = () => {
  const context = useContext(WordsContext);

  if (!context) {
    throw Error("useWordsContext must be used inside a WordsContextProvider");
  }

  return context;
};
