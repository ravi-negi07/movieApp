import React from "react";
import BannerHome from "../component/BannerHome";
import Card from "../component/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import HorizontalScroolCard from "../component/HorizontalScroolCard";
import useFetch from "../hooks/useFetch";
const Home = () => {
  const trendigData = useSelector((state) => state.movie.bannerData);
  // console.log("trneding", trendigData);

  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: popularTvShowData } = useFetch("/tv/popular");
  const { data: upcomingMovies } = useFetch("/movie/upcoming");
  console.log("onther aiur", popularTvShowData);
  return (
    <div className="bg-black/40 text-white">
      <BannerHome />

      <HorizontalScroolCard
        data={trendigData}
        heading={"Trending"}
        trending={true}
      />
      <HorizontalScroolCard
        data={nowPlayingData}
        heading={"now Playing"}
        media_type={"movie"}
      />

      <HorizontalScroolCard
        data={topRatedData}
        heading={"Top Rated Movies"}
        media_type={"movie"}
      />
      <HorizontalScroolCard
        data={popularTvShowData}
        heading={"popular TV Shows"}
        media_type={"tv"}
      />
      <HorizontalScroolCard
        data={upcomingMovies}
        heading={"coming soon"}
        media_type={"tv"}
      />
    </div>
  );
};

export default Home;
