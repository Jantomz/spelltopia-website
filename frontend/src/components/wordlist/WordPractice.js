import { useEffect, useState } from "react";
import styles from "../../styles/WordPractice.module.css";
import { useParams } from "react-router-dom";

export default function WordPractice({ words }) {
  const { id } = useParams();

  const [spelling, setSpelling] = useState("");

  const [wrong, setWrong] = useState(null);

  const [word, setWord] = useState();
  useEffect(() => {
    let count = localStorage.getItem(`${id}-count`);

    if (!count) {
      localStorage.setItem(`${id}-count`, 1);
    }

    count = localStorage.getItem(`${id}-count`);

    setWord(words[count - 1]);
  }, [id, words]);

  // Currently fixed with google drive embed
  const playAudio = () => {
    const audio = new Audio(word.audio);
    audio.play();
  };

  function getCount() {
    return localStorage.getItem(`${id}-count`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let count = localStorage.getItem(`${id}-count`);

    if (
      spelling?.toUpperCase() === word.title?.toUpperCase() &&
      count < words.length
    ) {
      count++;
      localStorage.setItem(`${id}-count`, count);
      setWrong(null);
      setWord(words[count - 1]);
      setSpelling("");
    } else if (spelling?.toUpperCase() === word.title?.toUpperCase()) {
      setWrong("Done Wordlist");
    } else {
      setWrong("That is Incorrect");
    }
  };

  const backward = () => {
    let count = localStorage.getItem(`${id}-count`);

    if (count > 1) {
      count--;
      localStorage.setItem(`${id}-count`, count);
      setWrong(null);
      setWord(words[count - 1]);
      setSpelling("");
    }
  };

  if (word) {
    return (
      <div className={styles.card}>
        {/* Audio temporarily fixed with google drive embed}
        {/* <span
          className="material-symbols-outlined audio-symbol"
          onClick={playAudio}
        >
          volume_up
        </span> */}
        <iframe
          height="50"
          width="300"
          src={
            word.audio.substring(0, word.audio.indexOf("/view")) + "/preview"
          }
        ></iframe>
        <h4>{word?.partOfSpeech}</h4>
        <h4>{word?.definition}</h4>
        <h4>{word?.etymology}</h4>
        <h4>{word?.sentence}</h4>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setSpelling(e.target.value)}
            value={spelling}
          ></input>
        </form>
        <div className={styles.wrong}>{wrong}</div>
        <button className={styles.backward} onClick={backward}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className={styles.count}>
          {getCount()}/{words.length}
        </div>
        <button className={styles.forward} onClick={handleSubmit}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
