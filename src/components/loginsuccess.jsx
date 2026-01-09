// src/components/LoginSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UserContextProvider";
import API_ENDPOINTS from "../config/apiConfig";

export default function LoginSuccess() {
  const { SetisAuthenticate } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.PROTECTED, {
          method: "GET",
          credentials: "include",
        });

        if (!cancelled) {
          if (res.ok) {
            SetisAuthenticate(true);
            navigate("/dashboard", { replace: true });
          } else {
            SetisAuthenticate(false);
            navigate("/login", { replace: true });
          }
        }
      } catch {
        if (!cancelled) {
          SetisAuthenticate(false);
          navigate("/login", { replace: true });
        }
      }
    };

    verify();
    return () => {
      cancelled = true;
    };
  }, [SetisAuthenticate, navigate]);

  return (
    <div className="min-h-screen grid place-items-center">
      <p className="text-gray-600">Signing you in…</p>
    </div>
  );
}
