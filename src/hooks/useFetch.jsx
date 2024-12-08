import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setLoading(false);
      setData(response.data.results);
      // console.log(response);
    } catch (error) {
      console.error("error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading };
};

export default useFetch;
