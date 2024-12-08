import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchDetail from "../hooks/useFetchDetails";
import moment from "moment/moment";
import Divider from "../component/Divider";
import useFetch from "../hooks/useFetch";
import HorizontalScroolCard from "../component/HorizontalScroolCard";
const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector((state) => state.movie.imageUrl);
  const { data } = useFetchDetail(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetail(
    `/${params?.explore}/${params?.id}/credits`
  );

  const { data: similarData } = useFetch(
    `  /${params?.explore}/${params?.id}/similar`
  );

  console.log("similaardata", similarData);

  const { data: recomendationData } = useFetch(
    `/${params?.explore}/${params?.id}/ recommendations`
  );
  const duration = data?.runtime
    ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
    : "N/A";

  const writer =
    castData?.crew
      ?.filter((el) => el.job.toLowerCase() === "writer")
      .map((el) => el?.name)
      .join(", ") || "N/A";

  console.log(writer);

  return (
    <div>
      <div className="w-full h-[580px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            alt=""
            className="h-full  w-full object-cover pb-20 "
          />
        </div>
        <div className="w-full h-full top-0 absolute bg-gradient-to-t from-neutral-900/90 to-transparent "></div>
      </div>
      <div className="container mx-auto px-4 py-16 gap-5 lg:gap-10 flex-col lg:flex-row lg:py-0 flex">
        <div className="lg:-mt-28 lg:mx-0 relative mx-auto gap-4 w-fit m-w-60">
          <img
            src={imageURL + data?.poster_path}
            alt=""
            className="h-80 w-60 object-cover rounded"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white lg:text-4xl">
            {data?.name || data?.title}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>
          <Divider />
          <div className="flex items-center  gap-3">
            <p>Rating:{Number(data?.vote_average).toFixed(1)}+ </p>
            <span>|</span>
            <p>View: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration:
              {duration}
            </p>
          </div>
          <Divider />

          <div>
            <h3 className="text-xl font-bold text-white my-1">Overview:</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className="flex items-center gap-3 my-3 text-center text-md font-semibold justify-center ">
              <p>
                Status:
                <br />
                <span>{data?.status}</span>
              </p>
              <span>|</span>
              <p>
                Released Date:
                <br />
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>
                Revenue:
                <br />
                {Number(data?.revenue)}
              </p>
            </div>
            <Divider />
          </div>
          <div>
            <p>
              <span className="text-white">Director:</span>
              {castData?.crew[0]?.name}
            </p>
            <p className="text-white">Writer:{writer}</p>
          </div>
          <Divider />
          <h2 className="lg:text-2xl text-lg font-bold my-3">Cast :</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              .map((starcast, index) => {
                return (
                  <div>
                    <div>
                      <img
                        src={imageURL + starcast?.profile_path}
                        alt=""
                        className="w-20 h-24 rounded-full"
                      />
                    </div>
                    <p className="font-bold text-center text-sm text-neutral-400">
                      {starcast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div>
        <HorizontalScroolCard
          data={similarData}
          heading={"Similar" + params?.explore}
          media_type={params?.explore}
        />
        <HorizontalScroolCard
          data={recomendationData}
          heading={"recomendation" + params?.explore}
          media_type={params?.explore}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
