import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "../../styles/Navbar.module.css";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <Link to="/" className={styles.link}>
        <h1 className={styles.title}>Spelltopia</h1>
      </Link>
      <nav>
        <div>
          {user ? (
            <>
              <span>
                {user.firstName} {user.lastName}
              </span>
              <button onClick={handleLogout} className={styles.logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
              <Link to="/signup" className={styles.link}>
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
