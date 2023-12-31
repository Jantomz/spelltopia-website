import { useEffect } from "react";
import WordPractice from "../components/wordlist/WordPractice";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWordlistsContext } from "../hooks/useWordlistsContext";

export default function Practice() {
  const { id } = useParams();
  const { wordlist, dispatch } = useWordlistsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWordlist = async () => {
      const response = await fetch(
        `https://spelltopia-website.onrender.com/api/wordlists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      ); // previously had http://localhost:4000 for the request, but now the package.json holds the automatic redirection to our backend server using proxy, removes cors error in development
      const json = await response.json(); // parses the response json into objects

      if (response.ok) {
        dispatch({ type: "SET_WORDLIST", payload: json });
      }
    };

    if (user) {
      fetchWordlist();
    }
  }, [dispatch, id, user]);

  if (wordlist) {
    return (
      <div className="container">
        <button
          className="back"
          onClick={() => navigate(`/wordlist/dashboard/${wordlist._id}`)}
        >
          Back
        </button>
        <WordPractice key={wordlist.words} words={wordlist.words} />
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
