import styles from "../../styles/WordDetails.module.css";
import { useWordsContext } from "../../hooks/useWordsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function WordDetails({ word }) {
  const audio = new Audio(word.audio);
  const { dispatch } = useWordsContext();
  const { user } = useAuthContext();

  const playAudio = () => {
    audio.play();
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `http://localhost:4000/api/words/${word._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    dispatch({ type: "DELETE_WORD", payload: json });
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
