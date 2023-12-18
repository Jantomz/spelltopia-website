import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

import styles from "../styles/Forms.module.css";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bot, setBot] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bot) {
      console.log("error 404");
    } else {
      await signup(firstName, lastName, email, password);
    }
  };

  return (
    <div className="container">
      <form className={styles.sign} onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <label>First Name:</label>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        ></input>
        <label>Last Name:</label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>

        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <input
          name="bot-field"
          placeholder="email address"
          type="hidden"
          onChange={(e) => setBot(e.target.value)}
        ></input>

        <button type="submit" disabled={isLoading}>
          Sign Up
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}
