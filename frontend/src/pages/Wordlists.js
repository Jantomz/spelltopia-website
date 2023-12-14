import { useEffect } from "react";

import { useAuthContext } from "../hooks/useAuthContext";

import styles from "../styles/Wordlists.module.css";

// components
import WordlistDetails from "../components/wordlist/WordlistDetails";
import { useWordlistsContext } from "../hooks/useWordlistsContext";

export default function Wordlists() {
  const { user } = useAuthContext();
  const { ownedWordlists, assignedWordlists, contributedWordlists, dispatch } =
    useWordlistsContext();

  useEffect(() => {
    const fetchWordlists = async () => {
      const response = await fetch("http://localhost:4000/api/wordlists", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }); // previously had http://localhost:4000 for the request, but now the package.json holds the automatic redirection to our backend server using proxy, removes cors error in development

      const json = await response.json(); // parses the response json into objects
      if (response.ok) {
        dispatch({
          type: "SET_WORDLISTS",
          payload: json,
        });
      }
    };

    if (user) {
      fetchWordlists(); // calling the function we just made, and we can use the await keyword here instead
    }
  }, [dispatch, user]); // needs dispatch dependency

  return (
    <div className={styles.wordlists}>
      {ownedWordlists &&
        ownedWordlists.map((wordlist) => (
          <WordlistDetails key={wordlist._id} wordlist={wordlist} />
        ))}
      {contributedWordlists &&
        contributedWordlists.map((wordlist) => (
          <WordlistDetails key={wordlist._id} wordlist={wordlist} />
        ))}
      {assignedWordlists &&
        assignedWordlists.map((wordlist) => (
          <WordlistDetails key={wordlist._id} wordlist={wordlist} />
        ))}
    </div>
  );
}
