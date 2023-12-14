import { useNavigate, useParams } from "react-router-dom";
import { useWordsContext } from "../../hooks/useWordsContext";

export default function UserWordlistTool() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { words } = useWordsContext();

  const handleClick = () => {
    navigate(`/practice/${id}/${words[0]._id}`);
  };

  return (
    <>
      <button onClick={handleClick}>Practice</button>
    </>
  );
}
