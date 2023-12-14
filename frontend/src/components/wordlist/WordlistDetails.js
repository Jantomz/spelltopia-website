import { Link } from "react-router-dom";
import styles from "../../styles/WordlistDetails.module.css";

export default function WordlistDetails({ wordlist }) {
  return (
    <Link to={`/wordlist/dashboard/${wordlist._id}`} className={styles.link}>
      <div className={styles.wordlistDetails}>
        <h1 className={styles.title}>{wordlist.title}</h1>
        <h3 className={styles.info}>Owner: {wordlist.owner}</h3>
        <h3 className={styles.info}>Visibility: {wordlist.visibility}</h3>
      </div>
    </Link>
  );
}
