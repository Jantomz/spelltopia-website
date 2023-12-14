import { useEffect, useState } from "react";
import WordPractice from "../components/wordlist/WordPractice";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Practice() {
  const { id, word_id } = useParams();
  const [words, setWords] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(
        `http://localhost:4000/api/words/list/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      ); // previously had http://localhost:4000 for the request, but now the package.json holds the automatic redirection to our backend server using proxy, removes cors error in development
      const json = await response.json(); // parses the response json into objects
      if (response.ok) {
        setWords(json);
        console.log(words);
      }
    };

    if (user) {
      fetchWords();
    }
  }, [id]);

  return (
    <div className="container">
      {words.map((word) => (
        <WordPractice key={word._id} word={word} />
      ))}
    </div>
  );
}
