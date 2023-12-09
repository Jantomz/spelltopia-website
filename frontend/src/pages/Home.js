import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";

// components
import WordlistDetails from "../components/wordlist/WordlistDetails";

export default function Home() {
  const [wordlists, setWordlists] = useState(null);

  useEffect(() => {
    const fetchWordlists = async () => {
      const response = await fetch("http://localhost:4000/api/wordlists"); // previously had http://localhost:4000 for the request, but now the package.json holds the automatic redirection to our backend server using proxy, removes cors error in development
      const json = await response.json(); // parses the response json into objects
      if (response.ok) {
        setWordlists(json);
      }
    };

    fetchWordlists(); // calling the function we just made, and we can use the await keyword here instead
  }, []); // needs dispatch dependency

  return (
    <div className={styles.home}>
      <div className={styles.wordlists}>
        {wordlists &&
          wordlists.map((wordlist) => (
            <WordlistDetails key={wordlist._id} wordlist={wordlist} />
          ))}
      </div>
    </div>
  );
}
