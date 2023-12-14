import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import "../../styles/WordlistDashboard.module.css";
import { useWordlistsContext } from "../../hooks/useWordlistsContext";

export default function WordlistUserList({ email }) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { dispatch } = useWordlistsContext();

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:4000/api/wordlists/${id}/user`,
      {
        method: "DELETE",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json", // makes the content type specified as json, otherwise it would be undefined
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_WORDLIST", payload: json });
    }
  };

  return (
    <>
      <li>
        {email}
        <i className="material-symbols-outlined" onClick={handleDelete}>
          cancel
        </i>
      </li>
    </>
  );
}
