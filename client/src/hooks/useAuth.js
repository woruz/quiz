import { useState } from "react";
import { toast } from "react-toastify";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (body) => {
    setLoading(true);
    setError(null);
    console.log(body)
    const {email,password} = body
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedIn", true);
        toast.success("Logged In");
        window.location.reload()
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const register = async (body) => {
    setLoading(true);
    setError(null);

    const {email,password} = body
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        toast.success("Success")
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    error,
    login,
    register,
  };
};

export default useAuth;