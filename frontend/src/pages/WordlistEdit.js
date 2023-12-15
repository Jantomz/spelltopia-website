import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import styles from "../styles/WordlistDashboard.module.css";

import WordDetailsEdit from "../components/wordlist/WordDetails";
import WordForm from "../components/wordlist/WordForm";
import WordlistUserList from "../components/wordlist/WordlistUserList";
import { useWordlistsContext } from "../hooks/useWordlistsContext";

export default function WordlistEdit() {
  const { wordlist, dispatch } = useWordlistsContext();
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [title, setTitle] = useState();

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

  const editWordlist = async () => {
    const response = await fetch(
      `https://spelltopia-website.onrender.com/api/wordlists/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: {
          title,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_WORDLIST", payload: json });
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
              <span class="material-symbols-outlined">edit</span>
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
                <form onSubmit={handleSubmit}>
                  <input
                    value={email}
                    placeholder="add email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </form>
              </li>
            </ul>
          </div>

          {wordlist.words &&
            wordlist.words.map((word) => (
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
