import { useState } from "react";
import styles from "../../styles/WordPractice.module.css";

export default function WordPractice({ word }) {
  const [spelling, setSpelling] = useState(null);

  const audio = new Audio(word.audio);
  const playAudio = () => {
    audio.play();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (spelling === word.title) {
      console.log("yaya");
    }
  };

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
        <input onChange={(e) => setSpelling(e.target.value)}></input>
      </form>
    </div>
  );
}
