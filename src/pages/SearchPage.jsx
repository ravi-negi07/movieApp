import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../component/Card";
import { useState } from "react";
const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const query = location?.search?.slice(3);
  const fetchData = async () => {
    try {
      const response = await axios.get("/search/multi", {
        params: {
          query: location?.search?.slice(3),
          page: page,
        },
      });
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
      console.log("response", data);
      // console.log("response", response.data.results);
      // setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [location.search]);
  // console.log("location", location.search.slice(3));

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="py-16">
      <div className="lg:hidden mx-1 sticky top-[100px] z-30">
        <input
          type="text"
          placeholder="search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query?.split("%20")?.join(" ")}
          className="px-4 py-3 text-lg w-full  bg-white rounded-full text-neutral-900"
        />
      </div>

      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl my-3 font-semibold mt-2">
          Search Results
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((searchData, index) => {
            return (
              <Card
                data={searchData}
                key={searchData.id + "search"}
                media_type={searchData.media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
