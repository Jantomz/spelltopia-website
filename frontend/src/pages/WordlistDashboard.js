import { useEffect, useState, Navigate } from "react";

import styles from "../styles/WordlistDashboard.module.css";

import WordDetails from "../components/wordlist/WordDetails";
import { useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import ContributorWordlistTools from "../components/admin/ContributorWordlistTools";
import UserWordlistTool from "../components/user/UserWordlistTools";
import { useWordsContext } from "../hooks/useWordsContext";

export default function WordlistDashboard() {
  const { words, dispatch } = useWordsContext();
  const { id } = useParams();
  const { user } = useAuthContext();
  const [title, setTitle] = useState(null);
  const [userNames, setUserNames] = useState([]);
  const [contributorNames, setContributorNames] = useState([]);
  const [ownerName, setOwnerName] = useState(null);

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
        setContributorNames(...contributorNames, contributors);
        setUserNames(...userNames, users);

        setOwnerName(owner);
      }
    };

    if (user) {
      fetchWords(); // calling the function we just made, and we can use the await keyword here instead
      fetchWordlistDetails();
    }
  }, [id, user]); // needs dispatch dependency

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
              : userNames.map((user) => <li key={user}>{user}</li>)}
          </ul>
        </div>
        <UserWordlistTool />
        {user.type !== "user" && <ContributorWordlistTools wordlist_id={id} />}
        {words !== null ? (
          words.map((word) => <WordDetails key={word._id} word={word} />)
        ) : (
          <div>No Words</div>
        )}
      </div>
    </div>
  );
}
