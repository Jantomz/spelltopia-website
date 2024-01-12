import { useNavigate, useParams } from "react-router-dom";
import { useWordlistsContext } from "../../hooks/useWordlistsContext";
import styles from "../../styles/Tools.module.css";
import ContributorWordlistTools from "./ContributorWordlistTools";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function UserWordlistTool() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { wordlist } = useWordlistsContext();
  const { user } = useAuthContext();

  const handleClick = () => {
    let startWord = prompt(
      "What word would you like to start at? (Leave blank to continue where you left off)"
    );

    for (let i = 0; i < wordlist.words.length; i++) {
      if (startWord.toUpperCase() === wordlist.words[i].title.toUpperCase()) {
        localStorage.setItem(`${id}-count`, i + 1);
        break;
      }
    }

    navigate(`/practice/${id}`);
    const count = localStorage.getItem(`${id}-count`);

    if (!count || count === wordlist.words.length) {
      localStorage.setItem(`${id}-count`, 1);
    }
  };

  return (
    <div className={styles.hbox}>
      {wordlist.words.length !== 0 && (
        <button onClick={handleClick} className={styles.bigBtn}>
          Practice
        </button>
      )}

      {user.type !== "user" && <ContributorWordlistTools wordlist_id={id} />}
    </div>
  );
}
