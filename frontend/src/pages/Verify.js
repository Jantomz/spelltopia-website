import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Verify() {
  const { token, id } = useParams();

  useEffect(() => {
    const verify = async () => {
      await fetch(
        `https://spelltopia-website.onrender.com/api/user/${id}/verify/${token}`
      );
    };

    verify();
  }, []);

  return <div>Email Verified</div>;
}
