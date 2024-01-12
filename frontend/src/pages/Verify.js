import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Verify() {
  const { token, id } = useParams();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const response = await fetch(
        `https://spelltopia-website.onrender.com/api/user/${id}/verify/${token}`
      );

      if (response.ok) {
        setVerified(true);
      }
    };

    verify();
  }, []);

  return (
    <div>
      {verified ? (
        <div>
          Email Verified! Now you can
          <Link href="https://spelltopia/login">Login</Link>
        </div>
      ) : (
        <div>Verifying... Please Wait</div>
      )}
      ;
    </div>
  );
}
