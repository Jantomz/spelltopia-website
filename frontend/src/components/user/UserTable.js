import styles from "../../styles/Tools.module.css";

export default function UserTable({ user }) {
  return (
    <div className={styles.row}>
      <div className={styles.cell}>{user.firstName}</div>
      <div className={styles.cell}>{user.lastName}</div>
      <div className={styles.cell}>{user.email}</div>
      <div className={styles.cell}>{user.type}</div>
    </div>
  );
}
