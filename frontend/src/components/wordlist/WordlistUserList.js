import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import "../../styles/WordlistDashboard.module.css";

export default function WordlistUserList({ email }) {
  const { id } = useParams();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:4000/api/wordlists/remove/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json", // makes the content type specified as json, otherwise it would be undefined
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
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
