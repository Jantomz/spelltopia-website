import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWordlistsContext } from "../../hooks/useWordlistsContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboardTools() {
  const { user } = useAuthContext();
  const { dispatch } = useWordlistsContext();

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async () => {
    const wordlist = {
      title: "New Wordlist",
      owner: user.email,
    };

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch("http://localhost:4000/api/wordlists", {
      method: "POST",
      body: JSON.stringify(wordlist),
      headers: {
        "Content-Type": "application/json", // makes the content type specified as json
        Authorization: `Bearer ${user.token}`,
      },
    });

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

  return (
    <div>
      <button>Users</button>
      <button onClick={handleCreate}>Create Wordlist</button>
      {error && <div>{error}</div>}
    </div>
  );
}
