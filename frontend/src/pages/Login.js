import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

import styles from "../styles/Forms.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bot, setBot] = useState("");

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bot) {
      console.log("error");
    } else {
      await login(email, password);
    }
  };

  return (
    <div className="container">
      <form className={styles.sign} onSubmit={handleSubmit}>
        <h3>Login</h3>
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
          Login
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}
