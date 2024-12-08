import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import Card from "../component/Card";
const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  // console.log("params", params.explore);
  const fetchData = async () => {
    try {
      const response = await axios.get(`discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
      // console.log("response", response.data.results);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll());
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl my-3 font-semibold mt-2">
          Popular {params.explore} Show
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((exploreData, index) => {
            return (
              <Card
                data={exploreData}
                key={exploreData.id + "exploreSEction"}
                media_type={params.explore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
