import { useEffect, useState } from "react";
import styles from "../../styles/WordPractice.module.css";
import { useParams } from "react-router-dom";

export default function WordPractice({ words }) {
  const { id } = useParams();

  const [spelling, setSpelling] = useState(null);
  const [count, setCount] = useState();

  const [wrong, setWrong] = useState(null);

  const [word, setWord] = useState();
  useEffect(() => {
    const count = localStorage.getItem(`${id}-count`);

    if (!count) {
      localStorage.setItem(`${id}-count`, 1);
    }

    setCount(localStorage.getItem(`${id}-count`));

    setWord(words[count - 1]);
  }, []);

  const playAudio = () => {
    const audio = new Audio(word.audio);
    audio.play();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (spelling === word.title && count < words.length) {
      setCount(Number(count) + 1);
      localStorage.setItem(`${id}-count`, Number(count) + 1);
      setWrong(null);
      setWord(words[count]);
      setSpelling("");
    } else if (spelling === word.title) {
      setWrong("Done Wordlist");
    } else {
      setWrong("That is Incorrect");
    }
  };

  if (count) {
    return (
      <div className={styles.card}>
        <span
          className="material-symbols-outlined audio-symbol"
          onClick={playAudio}
        >
          volume_up
        </span>
        <h4>{word.partOfSpeech}</h4>
        <h4>{word.definition}</h4>
        <h4>{word.etymology}</h4>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setSpelling(e.target.value)}
            value={spelling}
          ></input>
        </form>
        {wrong}
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
