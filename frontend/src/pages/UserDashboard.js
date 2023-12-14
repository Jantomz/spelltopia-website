import { useAuthContext } from "../hooks/useAuthContext";
import Wordlists from "./Wordlists";
import AdminDashboardTools from "../components/user/AdminDashboardTools";

export default function UserDashboard() {
  const { user } = useAuthContext();
  return (
    <div className="container">
      <h1>{user.firstName}'s Dashboard</h1>
      <h3>{user.type}</h3>
      <hr />
      {user.type === "admin" ? <AdminDashboardTools /> : null}
      <Wordlists></Wordlists>
    </div>
  );
}
