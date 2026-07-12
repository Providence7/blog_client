import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const GoogleLoginButton = ({ onSuccess }) => {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col items-center gap-2">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            setError("");
            await loginWithGoogle(credentialResponse.credential);
            onSuccess?.();
          } catch (err) {
            setError(err.response?.data?.error || "Sign-in failed. Please try again.");
          }
        }}
        onError={() => setError("Google sign-in failed. Please try again.")}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default GoogleLoginButton;