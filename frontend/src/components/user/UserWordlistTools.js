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
