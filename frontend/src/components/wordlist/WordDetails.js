import styles from "../../styles/WordDetails.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWordlistsContext } from "../../hooks/useWordlistsContext";
import { useParams } from "react-router-dom";

export default function WordDetails({ word }) {
  const audio = new Audio(word.audio);
  const { user } = useAuthContext();
  const { id } = useParams();
  const { dispatch } = useWordlistsContext();

  const playAudio = () => {
    audio.play();
  };

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:4000/api/wordlists/${id}/words/${word._id}`,
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
          <h1 className={styles.title}>
            {word.title}
            <span className={styles.info}>{word.partOfSpeech}</span>
          </h1>
        </div>
        {user.type !== "user" && window.location.href.includes("edit") && (
          <i className="material-symbols-outlined" onClick={handleDelete}>
            delete
          </i>
        )}
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
