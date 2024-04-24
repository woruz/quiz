import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState([])

  const token = localStorage.getItem('token');

  useEffect(() => {
    getQuiz()
  }, [])
  

  const createQuiz = async (body) => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:5000/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data.success){
            toast.success(data.response);
        }else{
            toast.error(data.response);
        }
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getQuiz = async () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/quiz", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if(response.success){
            setQuiz(response.response)
        }
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
    quiz,
    createQuiz,
    getQuiz,
  };
};

export default useQuiz;