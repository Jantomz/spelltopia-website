import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWordlistsContext } from "../../hooks/useWordlistsContext";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Tools.module.css";

export default function AdminDashboardTools() {
  const { user } = useAuthContext();
  const { dispatch } = useWordlistsContext();

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const wordlist = {
      title: "New Wordlist",
      owner: user.email,
    };

    const response = await fetch(
      `https://spelltopia-website.onrender.com/api/wordlists`,
      {
        method: "POST",
        body: JSON.stringify(wordlist),
        headers: {
          "Content-Type": "application/json", // makes the content type specified as json
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json(); // when we make the post request, our backend also sends back the response as a json

    if (!response.ok) {
      setError(json.error); // setting the error state as the error since the error returns json with an error property
    }

    if (response.ok) {
      setError(null);
      dispatch({ type: "CREATE_WORDLIST", payload: json });
      navigate(`/wordlist/dashboard/${json._id}`);
    }
  };

  const handleUsers = async () => {
    navigate(`/users`);
  };

  return (
    <div className={styles.hbox}>
      <button className={styles.smallBtn} onClick={handleUsers}>
        Users
      </button>
      <button onClick={handleCreate} className={styles.smallBtn}>
        Create Wordlist
      </button>
      {error && <div>{error}</div>}
    </div>
  );
}
