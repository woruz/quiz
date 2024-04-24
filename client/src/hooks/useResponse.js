import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useResponse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([])

  const token = localStorage.getItem('token');

  useEffect(() => {
    getResponse()
  }, [])
  
  

  const createResponse = async (body) => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:5000/api/response", {
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

  const getResponse = async () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/response", {
      headers: {
        "Authorization": `${token}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log({responseimp: response})
        if(response.success){
            setData(response.response)
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
    data,
    createResponse,
  };
};

export default useResponse;