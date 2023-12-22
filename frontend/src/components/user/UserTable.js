import styles from "../../styles/Tools.module.css";

export default function UserTable({ user }) {
  const changeToContributor = async () => {};

  const changeToUser = async () => {};

  return (
    <div className={styles.row}>
      <div className={styles.cell}>{user.firstName}</div>
      <div className={styles.cell}>{user.lastName}</div>
      <div className={styles.cell}>{user.email}</div>
      <div className={styles.cell}>{user.type}</div>
      {user.type === "user" && (
        <button className={styles.cell} onClick={changeToContributor}>
          Change To Contributor
        </button>
      )}
      {user.type === "contributor" && (
        <button className={styles.cell} onClick={changeToUser}>
          Change To User
        </button>
      )}
    </div>
  );
}
