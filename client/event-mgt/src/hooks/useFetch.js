import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    const dataFormat = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortCont.signal,
    };
    setTimeout(() => {
      fetch(url, dataFormat)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch data from url");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("aborted");
          } else {
            setError(error.message);
            setIsPending(false);
          }
        });
    }, 1000);
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
