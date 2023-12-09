import styles from "../../styles/WordDetails.module.css";

import { useEffect, useState } from "react";

export default function WordDetails({ word }) {
  const audio = new Audio(word.audio);

  const playAudio = () => {
    audio.play();
  };

  return (
    <div className={styles.word}>
      <div className={styles.hbox}>
        <h1 className={styles.title}>{word.title}</h1>
        <h4 className={styles.info}>{word.partOfSpeech}</h4>
      </div>
      <h4 className={styles.info}>
        {word.pronunciation}
        <span
          className="material-symbols-outlined audio-symbol"
          onClick={playAudio}
        >
          volume_up
        </span>
      </h4>
      <h4 className={styles.info}>{word.definition}</h4>
      <h4 className={styles.info}>{word.etymology}</h4>
      <h4 className={styles.info}>{word.sentence}</h4>
    </div>
  );
}
