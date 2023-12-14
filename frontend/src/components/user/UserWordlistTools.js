import { useNavigate, useParams } from "react-router-dom";
import { useWordlistsContext } from "../../hooks/useWordlistsContext";

export default function UserWordlistTool() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { wordlist } = useWordlistsContext();

  const handleClick = () => {
    navigate(`/practice/${id}`);
    const count = localStorage.getItem(`${id}-count`);

    if (!count || count == wordlist.words.length) {
      localStorage.setItem(`${id}-count`, 1);
    }
  };

  return (
    <>
      <button onClick={handleClick}>Practice</button>
    </>
  );
}
