import { useEffect } from "react";

import styles from "../styles/WordlistDashboard.module.css";

import Header from "../components/base/Navbar";
import WordDetails from "../components/wordlist/WordDetails";
import { useParams } from "react-router-dom";
import WordForm from "../components/wordlist/WordForm";
import { useWordsContext } from "../hooks/useWordsContext";

export default function WordlistEdit() {
  const { words, dispatch } = useWordsContext();

  const { id } = useParams();

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(
        `http://localhost:4000/api/words/list/${id}`
      ); // previously had http://localhost:4000 for the request, but now the package.json holds the automatic redirection to our backend server using proxy, removes cors error in development
      const json = await response.json(); // parses the response json into objects
      if (response.ok) {
        dispatch({ type: "SET_WORDS", payload: json });
      }
    };

    fetchWords(); // calling the function we just made, and we can use the await keyword here instead
  }, [id, dispatch]); // needs dispatch dependency

  return (
    <div>
      <div className={styles.words}>
        {words &&
          words.map((word) => <WordDetails key={word._id} word={word} />)}
        <WordForm></WordForm>
      </div>
    </div>
  );
}
