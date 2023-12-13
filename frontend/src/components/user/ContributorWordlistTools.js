import { useNavigate } from "react-router-dom";

export default function ContributorWordlistTools(props) {
  const navigate = useNavigate();

  const editWordlist = () => {
    const editURL = `/wordlist/edit/${props.wordlist_id}`;
    navigate(editURL);
  };

  return (
    <div>
      <button onClick={editWordlist}>Edit</button>
    </div>
  );
}
