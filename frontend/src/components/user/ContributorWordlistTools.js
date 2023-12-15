import { useNavigate } from "react-router-dom";
import styles from "../../styles/Tools.module.css";

export default function ContributorWordlistTools(props) {
  const navigate = useNavigate();

  const editWordlist = () => {
    navigate(`/wordlist/edit/${props.wordlist_id}`);
  };

  return (
    <div>
      <button onClick={editWordlist} className={styles.bigBtn}>
        Edit
      </button>
    </div>
  );
}
