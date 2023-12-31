import { useEffect } from "react";

import styles from "../styles/WordlistDashboard.module.css";

import WordDetails from "../components/wordlist/WordDetails";
import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import UserWordlistTool from "../components/user/UserWordlistTools";
import { useWordlistsContext } from "../hooks/useWordlistsContext";

export default function WordlistDashboard() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { wordlist, dispatch } = useWordlistsContext();
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
      fetchWordlist(); // calling the function we just made, and we can use the await keyword here instead
    }
  }, [dispatch, id, user]); // needs dispatch dependency

  if (wordlist) {
    return (
      <div className="container">
        <button className="back" onClick={() => navigate("/")}>
          Back
        </button>
        <div className={styles.words}>
          <h1>{wordlist.title}</h1>
          <div>{wordlist.visibility}</div>
          <h4>Owner: {wordlist.owner}</h4>
          <div>
            <h4>Contributors:</h4>
            <ul>
              {wordlist.contributor.length !== 0
                ? wordlist.contributor.map((u) => <li key={u}>{u}</li>)
                : "None"}
            </ul>
          </div>
          <div>
            <h4>Assigned Users:</h4>
            <ul>
              {wordlist.user.length !== 0
                ? wordlist.user.map((u) => <li key={u}>{u}</li>)
                : "None"}
            </ul>
          </div>
          <UserWordlistTool />

          {wordlist.words ? (
            wordlist.words.map((word) => (
              <WordDetails key={word._id} word={word} />
            ))
          ) : (
            <div>No Words</div>
          )}
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
