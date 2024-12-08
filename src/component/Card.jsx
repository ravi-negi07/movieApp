import React from "react";
import { setImageUrl } from "../store/movieSlice";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import { Link } from "react-router-dom";
const Card = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector((state) => state.movie.imageUrl);
  const mediaType = data.media_type ?? media_type;
  //   console.log("imga", imageURL);
  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full min-w-[230px] max-w-[230px] rounded h-80 overflow-hidden block relative hover:scale-105 transition-all"
    >
      {data?.poster_path ? (
        <img src={imageURL + data?.poster_path} alt="" />
      ) : (
        <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
          No image found!
        </div>
      )}

      <div className="absolute top-4 ">
        {trending && (
          <div className="py-1 px-4  overflow-hidden bg-black/60 rounded-r-full">
            #{index}
            Trending
          </div>
        )}
      </div>
      <div className="absolute bottom-0  backdrop-blur-3xl w-full h-16 bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data?.title || data?.name}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>{moment(data.release_date).format("MMM Do YY")}</p>
          <p className="bg-black px-1 rounded-full text-xs text-white">
            Rating:
            {Number(data.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
