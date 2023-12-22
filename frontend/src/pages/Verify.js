import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Verify() {
  const { token, id } = useParams();
  let json = null;

  useEffect(() => {
    const verify = async () => {
      const response = await fetch(
        `https://spelltopia-website.onrender.com/api/user/${id}/verify/${token}`
      );

      if (response.ok) {
        return await response.json();
      }
    };

    json = verify();
  }, []);

  return (
    <div>
      {json ? (
        <div>
          Email Verified! Now you can <Link href="/login">Login</Link>
        </div>
      ) : (
        <div>Verifying... Please Wait</div>
      )}
      ;
    </div>
  );
}
