import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const HorizontalScroolCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handlePrev = () => {
    containerRef.current.scrollLeft = -300;
  };
  return (
    <div>
      <div className="container mx-auto px-3 my-10">
        <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white capitalize">
          {heading}
        </h2>
        <div className=" relative">
          <div
            ref={containerRef}
            className="grid overflow-hidden grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll relative z-10 scroll-smooth transition-all scrolbar-none"
          >
            {data.map((data, index) => {
              return (
                <Card
                  key={data.id + "heading" + index}
                  data={data}
                  index={index + 1}
                  trending={true}
                  media_type={media_type}
                />
              );
            })}
          </div>
          <div className="absolute hidden top-0 lg:flex justify-between w-full h-full items-center">
            <button
              onClick={handlePrev}
              className="bg-white text-black p-1 rounded-full -ml-1 z-10"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleNext}
              className="bg-white text-black p-1 rounded-full -ml-1 z-10"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroolCard;
