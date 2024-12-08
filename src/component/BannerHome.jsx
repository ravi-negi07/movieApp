import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerHome = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const bannerData = useSelector((state) => state.movie.bannerData);
  //   console.log("banner Home", bannerData);
  const imageURL = useSelector((state) => state.movie.imageUrl);

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerData, imageURL, currentImage]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        <div className="flex">
          {bannerData.map((data, index) => {
            // console.log(data);
            return (
              <div
                className="min-w-full min-h-[450px] lg:min-g-full overflow-hidden relative group transition-all"
                style={{ transform: `translate(-${currentImage * 100}%)` }}
                key={data.id + "bannerHome" + index}
              >
                <div className="w-full h-full object-cover">
                  <img src={imageURL + data.backdrop_path} alt="banner" />
                </div>

                {/* button next and previous image */}

                <div className="absolute top-0 w-full h-full  hidden items-center justify-between px-4 group-hover:lg:flex">
                  <button
                    className="hover:bg-white p-2 rounded text-2xl z-10 text-black"
                    onClick={handlePrev}
                  >
                    <FaAngleLeft />
                  </button>
                  <button
                    className="hover:bg-white p-2 rounded text-2xl z-10 text-black"
                    onClick={handleNext}
                  >
                    <FaAngleRight />
                  </button>
                </div>
                <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
                <div className="container mx-auto">
                  <div className=" absolute bottom-0  text-white max-w-md px-3">
                    <h1 className="font-bold text-white text-2xl lg:text-4xl drop-shadow-3xl">
                      {data.title || data.original_name}
                    </h1>
                    <p className="text-semibold text-ellipsis line-clamp-3 my-2">
                      {" "}
                      {data.overview}
                    </p>
                    <div className="flex items-center gap-4 my-2">
                      <p>Rating: {Number(data.vote_average).toFixed(1)}</p>
                      <p>View:{Number(data.popularity).toFixed(0)}</p>
                    </div>
                    <button className=" px-4 mb-4 py-2 text-black font-bold rounded mt-4 bg-white hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
                      play Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BannerHome;
