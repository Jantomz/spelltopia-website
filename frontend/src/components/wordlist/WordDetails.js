import styles from "../../styles/WordDetails.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWordlistsContext } from "../../hooks/useWordlistsContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function WordDetails({ word }) {
  // const audio = new Audio(word.audio);
  const { user } = useAuthContext();
  const { id } = useParams();
  const { dispatch } = useWordlistsContext();
  const [showAudio, setShowAudio] = useState(false);

  // const playAudio = () => {
  //   audio.play();
  // };

  const loadAudio = () => {
    setShowAudio(true);
  };

  const handleDelete = async () => {
    const response = await fetch(
      `https://spelltopia-website.onrender.com/api/wordlists/${id}/words/${word._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_WORDLIST", payload: json });
    }
  };

  return (
    <div className={styles.word}>
      <div className={styles.hbox}>
        <div>
          <h1
            className={
              !word.definition && !word.etymology && !word.sentence
                ? styles.titleAlone
                : styles.title
            }
          >
            {word.title}
            {word.partOfSpeech ? (
              <span className={styles.info}>{word.partOfSpeech}</span>
            ) : (
              <h4 className={styles.info}>
                {word.pronunciation}
                {/* Upload is temporarily fixed with iframe from google drive*/}
                {showAudio ? (
                  <iframe
                    height="50"
                    width="300"
                    src={
                      word.audio.substring(0, word.audio.indexOf("/view")) +
                      "/preview"
                    }
                  ></iframe>
                ) : (
                  <span
                    className="material-symbols-outlined audio-symbol"
                    // onClick={playAudio}
                    onClick={loadAudio}
                  >
                    volume_up
                  </span>
                )}
              </h4>
            )}
          </h1>
        </div>
        {user.type !== "user" && window.location.href.includes("edit") && (
          <i className="material-symbols-outlined" onClick={handleDelete}>
            delete
          </i>
        )}
      </div>
      {word.partOfSpeech && (
        <h4 className={styles.info}>
          {word.pronunciation}
          {/* Upload is temporarily fixed with iframe from google drive*/}
          {showAudio ? (
            <iframe
              height="50"
              width="300"
              src={
                word.audio.substring(0, word.audio.indexOf("/view")) +
                "/preview"
              }
            ></iframe>
          ) : (
            <span
              className="material-symbols-outlined audio-symbol"
              // onClick={playAudio}
              onClick={loadAudio}
            >
              volume_up
            </span>
          )}
        </h4>
      )}

      {word.definition && <h4 className={styles.info}>{word.definition}</h4>}
      {word.etymology && <h4 className={styles.info}>{word.etymology}</h4>}
      {word.sentence && <h4 className={styles.info}>{word.sentence}</h4>}
    </div>
  );
}
