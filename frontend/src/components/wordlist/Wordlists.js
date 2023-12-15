import { useEffect } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";

import styles from "../../styles/Wordlists.module.css";

// components
import WordlistDetails from "./WordlistDetails";
import { useWordlistsContext } from "../../hooks/useWordlistsContext";

export default function Wordlists() {
  const { user } = useAuthContext();
  const { wordlists, dispatch } = useWordlistsContext();

  useEffect(() => {
    const fetchWordlists = async () => {
      const response = await fetch(
        `https://spelltopia-website.onrender.com/api/wordlists`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      ); // previously had http://localhost:4000 for the request, but now the package.json holds the automatic redirection to our backend server using proxy, removes cors error in development

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
  }, []); // needs dispatch dependency

  if (wordlists) {
    return (
      <div className={styles.wordlists}>
        {wordlists.owned &&
          wordlists.owned.map((wordlist) => (
            <WordlistDetails key={wordlist._id} wordlist={wordlist} />
          ))}
        {wordlists.contributed &&
          wordlists.contributed.map((wordlist) => (
            <WordlistDetails key={wordlist._id} wordlist={wordlist} />
          ))}
        {wordlists.assigned &&
          wordlists.assigned.map((wordlist) => (
            <WordlistDetails key={wordlist._id} wordlist={wordlist} />
          ))}
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
