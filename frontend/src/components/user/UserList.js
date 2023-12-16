import { useEffect } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import UserTable from "./UserTable";
import styles from "../../styles/Tools.module.css";

export default function UserList() {
  const { dispatch, users } = useUserContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `https://spelltopia-website.onrender.com/api/user`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    if (user) {
      fetchUsers();
    }
  }, []);

  console.log(users);

  return (
    <div className={styles.table}>
      <div className={styles.row}>
        <div className={styles.cellTitle}>First Name</div>
        <div className={styles.cellTitle}>Last Name</div>
        <div className={styles.cellTitle}>Email</div>
        <div className={styles.cellTitle}>Type</div>
      </div>
      {users?.map((u) => (
        <UserTable user={u} key={u._id} />
      ))}
    </div>
  );
}
