import { useNavigate } from "react-router-dom";

export default function ContributorWordlistTools(props) {
  const navigate = useNavigate();

  const editWordlist = () => {
    navigate(`/wordlist/edit/${props.wordlist_id}`);
  };

  return (
    <div>
      <button onClick={editWordlist}>Edit</button>
    </div>
  );
}
