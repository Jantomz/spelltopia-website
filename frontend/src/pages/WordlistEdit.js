import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import styles from "../styles/WordlistDashboard.module.css";

import WordDetailsEdit from "../components/wordlist/WordDetails";
import WordForm from "../components/wordlist/WordForm";
import WordlistUserList from "../components/wordlist/WordlistUserList";
import { useWordlistsContext } from "../hooks/useWordlistsContext";
import { useUserContext } from "../hooks/useUserContext";

export default function WordlistEdit() {
  const { wordlist, dispatch } = useWordlistsContext();
  const { users, dispatch: userDispatch } = useUserContext();
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [title, setTitle] = useState();
  const [error, setError] = useState(null);
  const userEmails = [];

  const editTrue = () => {
    setEditingTitle(true);
  };

  const editFalse = () => {
    setEditingTitle(false);
    setIsFocused(false);
    editWordlist();
  };

  const checkEdit = () => {
    if (!isFocused) {
      setEditingTitle(false);
    }
  };

  const focusTrue = () => {
    setIsFocused(true);
  };

  const removeError = () => {
    setError(null);
  };

  const editWordlist = async () => {
    if (title) {
      const response = await fetch(
        `https://spelltopia-website.onrender.com/api/wordlists/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // makes the content type specified as json, otherwise it would be undefined
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ title }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORDLIST", payload: json });
      }
    } else {
      console.log("error, wordlist title empty");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const userResponse = await fetch(
        `https://spelltopia-website.onrender.com/api/user`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const userJson = await userResponse.json();

      if (userResponse.ok) {
        userDispatch({ type: "SET_USERS", payload: userJson });
      }
    };

    if (user) {
      fetchUsers();
    }
  }, []);

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

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    users?.map((u) => {
      userEmails.push(u.email);
    });

    if (!wordlist.user?.includes(email) && userEmails?.includes(email)) {
      // need to change this above, since the users object is the full object, not just the email
      const response = await fetch(
        `https://spelltopia-website.onrender.com/api/wordlists/${id}/user`,
        {
          method: "POST",
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
        setEmail("");
        setError(null);
      }
    } else {
      setEmail("");
      if (wordlist.user?.includes(email)) {
        setError("User is already added!");
      } else {
        setError("User does not exist");
      }
    }
  };
  const handleDelete = async () => {
    const response = await fetch(
      `https://spelltopia-website.onrender.com/api/wordlists/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORDLIST", payload: json });
      navigate("/");
    }
  };

  if (wordlist) {
    return (
      <div className="container">
        <button
          className="back"
          onClick={() => navigate(`/wordlist/dashboard/${id}`)}
        >
          Back
        </button>
        <div className={styles.words}>
          {editingTitle ? (
            <h1>
              <input
                className={styles.editingTitle}
                placeholder={wordlist.title}
                onBlur={editFalse}
                onMouseLeave={checkEdit}
                onFocus={focusTrue}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
            </h1>
          ) : (
            <h1 onMouseEnter={editTrue} onMouseLeave={editFalse}>
              {wordlist.title}
              <span className="material-symbols-outlined">edit</span>
            </h1>
          )}
          <h4>Owner: {wordlist.owner}</h4>
          <div>
            <h4>Contributors:</h4>
            <ul>
              {wordlist.contributor?.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Assigned Users:</h4>
            <ul>
              {wordlist.user?.map((u) => (
                <WordlistUserList key={u} email={u}></WordlistUserList>
              ))}
              <li>
                <form onSubmit={handleUserSubmit}>
                  <input
                    value={email}
                    placeholder="add email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={removeError}
                  ></input>
                </form>
                {error && <div className={styles.error}>{error}</div>}
              </li>
            </ul>
          </div>

          {wordlist.words?.map((word) => (
            <WordDetailsEdit key={word._id} word={word} />
          ))}
          <WordForm></WordForm>
        </div>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          Delete Wordlist
        </button>
      </div>
    );
  } else {
    fetchWordlist();
    return <div>Loading</div>;
  }
}
