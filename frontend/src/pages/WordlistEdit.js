import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useWordsContext } from "../hooks/useWordsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import styles from "../styles/WordlistDashboard.module.css";

import WordDetailsEdit from "../components/wordlist/WordDetails";
import WordForm from "../components/wordlist/WordForm";
import WordlistUserList from "../components/wordlist/WordlistUserList";

export default function WordlistEdit() {
  const { words, dispatch } = useWordsContext();
  const { id } = useParams();
  const { user } = useAuthContext();

  const [userNames, setUserNames] = useState([]);
  const [contributorNames, setContributorNames] = useState([]);
  const [ownerName, setOwnerName] = useState(null);
  const [title, setTitle] = useState(null);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailObj = { email };

    const wordlist = await fetch(
      `http://localhost:4000/api/wordlists/add/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(emailObj),
        headers: {
          "Content-Type": "application/json", // makes the content type specified as json, otherwise it would be undefined
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (wordlist) {
      setUserNames((userNames) => [...userNames, email]);
      setEmail("");
    }
  };

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(
        `http://localhost:4000/api/words/list/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      ); // previously had http://localhost:4000 for the request, but now the package.json holds the automatic redirection to our backend server using proxy, removes cors error in development
      const json = await response.json(); // parses the response json into objects
      if (response.ok) {
        dispatch({ type: "SET_WORDS", payload: json });
      }
    };

    const fetchWordlistDetails = async () => {
      const response = await fetch(
        `http://localhost:4000/api/wordlists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      ); // previously had http://localhost:4000 for the request, but now the package.json holds the automatic redirection to our backend server using proxy, removes cors error in development
      const json = await response.json(); // parses the response json into objects
      if (response.ok) {
        const title = json.title;
        const contributors = json.contributor;
        const users = json.user;
        const owner = json.owner;

        setTitle(title);
        setContributorNames(contributors);
        setUserNames(users);
        setOwnerName(owner);
      }
    };

    if (user) {
      fetchWords(); // calling the function we just made, and we can use the await keyword here instead
      fetchWordlistDetails();
    }
  }, [id]); // needs dispatch dependency

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`http://localhost:4000/api/wordlists/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORD", payload: json });
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className={styles.words}>
        <h1>{title}</h1>
        <h4>Owner: {ownerName}</h4>
        <div>
          <h4>Contributors:</h4>
          <ul>
            {contributorNames == ""
              ? "None"
              : contributorNames.map((user) => <li key={user}>{user}</li>)}
          </ul>
        </div>
        <div>
          <h4>Assigned Users:</h4>
          <ul>
            {userNames == ""
              ? "None"
              : userNames.map((user) => (
                  <WordlistUserList key={user} email={user} />
                ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            value={email}
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </form>
        {words &&
          words.map((word) => <WordDetailsEdit key={word._id} word={word} />)}
        <WordForm></WordForm>
      </div>
      <button onClick={handleDelete}>Delete Wordlist</button>
    </div>
  );
}
