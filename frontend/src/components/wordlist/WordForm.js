import { useParams } from "react-router-dom";
import styles from "../../styles/WordDetails.module.css";
import styleForm from "../../styles/Forms.module.css";

import { useWordsContext } from "../../hooks/useWordsContext";

import { useState } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";

export default function WordForm() {
  const { dispatch } = useWordsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [definition, setDefinition] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [etymology, setEtymology] = useState("");
  const [sentence, setSentence] = useState("");
  const [audio, setAudio] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const handleClick = async () => {
    const wordlist_id = id;

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const word = {
      title,
      partOfSpeech,
      definition,
      pronunciation,
      etymology,
      sentence,
      wordlist_id,
      audio,
    };

    const response = await fetch("http://localhost:4000/api/words", {
      method: "POST",
      body: JSON.stringify(word),
      headers: {
        "Content-Type": "application/json", // makes the content type specified as json
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json(); // when we make the post request, our backend also sends back the response as a json

    if (!response.ok) {
      setError(json.error); // setting the error state as the error since the error returns json with an error property
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      console.log("New Word Added", json);
      setTitle("");
      setPronunciation("");
      setPartOfSpeech("");
      setDefinition("");
      setSentence("");
      setEtymology("");
      setAudio("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORD", payload: json });
    }
  };

  const removeEmptyField = (index) => {
    if (index !== -1) {
      emptyFields.splice(index, 1);
    }
  };

  return (
    <div className={styles.word}>
      <form>
        <div className={styles.add} onClick={handleClick}>
          <i className="material-symbols-outlined">add_circle</i>
        </div>
        <textarea
          type="text"
          placeholder="word"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            const index = emptyFields.indexOf("title");
            removeEmptyField(index);
          }}
          className={
            emptyFields.includes("title")
              ? styles.inputTitleError
              : styles.inputTitle
          } // giving dynamic classname based on if the empty field array includes this part
        ></textarea>
        <textarea
          type="text"
          placeholder="part of speech"
          value={partOfSpeech}
          onChange={(e) => {
            setPartOfSpeech(e.target.value);
            const index = emptyFields.indexOf("partOfSpeech");
            removeEmptyField(index);
          }}
          className={
            emptyFields.includes("partOfSpeech")
              ? styles.inputInfoError
              : styles.inputInfo
          }
        ></textarea>
        <textarea
          type="text"
          placeholder="pronunciation"
          value={pronunciation}
          onChange={(e) => {
            setPronunciation(e.target.value);
            const index = emptyFields.indexOf("pronunciation");
            removeEmptyField(index);
          }}
          className={
            emptyFields.includes("pronunciation")
              ? styles.inputInfoError
              : styles.inputInfo
          }
        ></textarea>
        <textarea
          type="text"
          placeholder="definition"
          value={definition}
          onChange={(e) => {
            setDefinition(e.target.value);
            const index = emptyFields.indexOf("definition");
            removeEmptyField(index);
          }}
          className={
            emptyFields.includes("definition")
              ? styles.inputInfoError
              : styles.inputInfo
          }
        ></textarea>
        <textarea
          type="text"
          placeholder="etymology"
          value={etymology}
          onChange={(e) => {
            setEtymology(e.target.value);
            const index = emptyFields.indexOf("etymology");
            removeEmptyField(index);
          }}
          className={
            emptyFields.includes("etymology")
              ? styles.inputInfoError
              : styles.inputInfo
          }
        ></textarea>
        <textarea
          type="text"
          placeholder="sentence"
          value={sentence}
          onChange={(e) => {
            setSentence(e.target.value);
            const index = emptyFields.indexOf("sentence");
            removeEmptyField(index);
          }}
          className={
            emptyFields.includes("sentence")
              ? styles.inputInfoError
              : styles.inputInfo
          }
        ></textarea>
        <textarea
          type="text"
          placeholder="audio link"
          value={audio}
          onChange={(e) => {
            setAudio(e.target.value);
            const index = emptyFields.indexOf("audio");
            removeEmptyField(index);
          }}
          className={
            emptyFields.includes("audio")
              ? styles.inputInfoError
              : styles.inputInfo
          }
        ></textarea>
      </form>
      {error && <div className={styleForm.error}>{error}</div>}
    </div>
  );
}
