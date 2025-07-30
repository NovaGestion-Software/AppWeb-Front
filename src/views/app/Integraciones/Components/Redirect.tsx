import { useEffect } from "react";

export const Redirect: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code && window.opener) {
      window.opener.postMessage({ code }, window.origin);
      window.close();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
      Redirigiendo y cerrando ventana...
    </div>
  );
};
