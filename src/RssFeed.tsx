import html2canvas from "html2canvas";
import { useState } from "react";
import { createRssFeed } from "./axios";
import Shimmer from "./atoms/Shimmer";
import "./index.css";

function RssFeed() {
  const [inputValue, setInputValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [count, setCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const displayData = searchData;

  const getTitleFontSize = (title: string) => {
    const length = title.length;
    if (length > 100) return "text-sm";
    if (length > 75) return "text-base";
    if (length > 50) return "text-lg";
    if (length < 50) return "text-xl";
    if (length < 30) return "text-2xl";
    if (length < 15) return "text-3xl";
    return "text-sm";
  };

  const downloadImage = (element: any) => {
    const getTitleFontSizeInPX = (title: string) => {
      const length = title.length;

      if (length > 100) return "70px";
      if (length > 75) return "90px";
      if (length > 70) return "100px";
      if (length >= 50) return "102px";
      if (length >= 30) return "115px";
      if (length >= 15) return "120px";
      return "150px";
    };

    const offscreenElement = document.createElement("div");
    offscreenElement.style.width = "1080px";
    offscreenElement.style.height = "1920px";
    offscreenElement.style.position = "absolute";
    offscreenElement.style.left = "-9999px";
    offscreenElement.style.top = "0";
    offscreenElement.style.overflow = "hidden";
    offscreenElement.style.backgroundColor = "black";

    const clonedElement = element.cloneNode(true);
    clonedElement.style.width = "100%";
    clonedElement.style.height = "100%";
    clonedElement.style.display = "flex";
    clonedElement.style.flexDirection = "column";
    clonedElement.style.position = "relative";
    offscreenElement.appendChild(clonedElement);
    document.body.appendChild(offscreenElement);

    const clonedImage = clonedElement.querySelector(
      "img:first-of-type"
    ) as HTMLImageElement;
    const clonedImageContainer = document.createElement("div");
    clonedImageContainer.style.position = "relative";
    clonedImageContainer.style.width = "138%";
    clonedImageContainer.style.height = "62%";
    clonedImageContainer.style.marginLeft = "-150px";
    clonedImageContainer.style.overflow = "hidden";

    clonedImage.style.width = "100%";
    clonedImage.style.height = "100%";
    clonedImage.style.objectFit = "contain";
    clonedImage.style.display = "block";

    clonedImageContainer.appendChild(clonedImage);
    clonedElement.insertBefore(clonedImageContainer, clonedElement.firstChild);

    const gradientOverlay = document.createElement("div");
    gradientOverlay.style.position = "absolute";
    gradientOverlay.style.bottom = "0%";
    gradientOverlay.style.left = "0";
    gradientOverlay.style.width = "100%";
    gradientOverlay.style.height = "12%";
    gradientOverlay.style.background =
      "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))";
    gradientOverlay.style.zIndex = "1";
    clonedImageContainer.appendChild(gradientOverlay);

    const clonedTitle = clonedElement.querySelector("h2");
    if (clonedTitle) {
      const titleText = clonedTitle.innerText || "";
      const fontSize = getTitleFontSizeInPX(titleText);

      clonedTitle.style.fontSize = fontSize;
      clonedTitle.style.padding = "20px";
      clonedTitle.style.fontFamily = "Poppins, sans-serif";
      clonedTitle.style.lineHeight = "1.2";
      clonedTitle.style.position = "relative";
      clonedTitle.style.zIndex = "2";
    }

    const clonedUrlLogoContainer = clonedElement.querySelector("div.relative");
    const clonedUrlLogo = clonedUrlLogoContainer.querySelector("img");
    // clonedUrlLogo.style.width = "400px";
    clonedUrlLogo.style.height = "80px";
    clonedUrlLogo.style.objectFit = "contain";
    clonedUrlLogo.style.margin = "0 auto";
    clonedUrlLogo.style.position = "absolute";
    clonedUrlLogo.style.zIndex = "10";

    const clonedDate = clonedElement.querySelector("p:nth-of-type(1)");
    clonedDate.style.fontSize = "10px";
    clonedDate.style.marginTop = "auto";
    clonedDate.style.padding = "10px 20px 0px 20px";

    const clonedUrl = clonedElement.querySelector("p:nth-of-type(2)");
    clonedUrl.style.fontSize = "10px";
    clonedUrl.style.marginTop = "auto";
    clonedUrl.style.padding = "5px 20px 10px 20px";

    const gradientLine = clonedElement.querySelector(".bg-gradient-to-t");
    if (gradientLine) {
      gradientLine.style.display = "none";
    }

    html2canvas(offscreenElement, {
      useCORS: true,
      width: 1080,
      height: 1920,
      scale: 1,
      backgroundColor: null,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "image.png";
      link.click();

      if (gradientLine) {
        gradientLine.style.display = "";
      }

      document.body.removeChild(offscreenElement);
    });
  };

  const handleSearch = async () => {
    if (inputValue) {
      setIsLoading(true);
      try {
        const data = await createRssFeed(inputValue);
        setSearchData(data);
        setCount(8);
      } catch (error) {
        console.error("Failed to fetch RSS feed:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Please enter a valid URL");
    }
  };

  return (
    <>
      <div className="flex justify-center my-4">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Search URL"
          className="p-2 border w-1/2 border-black rounded-lg"
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="mx-4 bg-green-400 px-4 py-2 rounded-lg text-white font-medium"
        >
          Search
        </button>
        <button
          onClick={() => {
            setInputValue("");
            setSearchData([]);
          }}
          className="mx-4 bg-red-400 px-4 py-2 rounded-lg text-white font-medium"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4 overflow-x-hidden">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="cursor-pointer rounded shadow-lg bg-black flex flex-col relative"
            >
              <Shimmer className="w-full h-96 bg-gray-200 rounded-t animate-pulse" />
              <div className="flex items-center justify-center relative ">
                <Shimmer className="h-[20px] w-[80px] bg-gray-200 rounded-md bottom-[22px] animate-pulse absolute z-10" />
              </div>
              <div className="col-span-4 bg-gradient-to-t from-black to-transparent h-[20px] w-full absolute top-[364px]"></div>
              <div className="flex flex-col justify-between flex-grow mt-4 px-4 overflow-hidden">
                <Shimmer className="w-full h-6 bg-gray-200 rounded-md animate-pulse" />
                <div className="mb-2">
                  <Shimmer className="w-1/2 h-2 bg-gray-200 rounded-md  mt-2 animate-pulse" />
                  <Shimmer className="w-1/3 h-2 rounded-md bg-gray-200  mt-2 animate-pulse" />
                </div>
              </div>
            </div>
          ))
        ) : displayData.length > 0 ? (
          displayData?.slice(0, count).map((item: any, index) => (
            <div
              key={index}
              className="cursor-pointer rounded shadow-lg bg-black flex flex-col relative"
              onClick={(e) => downloadImage(e.currentTarget)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-96 object-cover rounded-t"
              />
              <div className="flex items-center justify-center relative ">
                <img
                  src={item.logo}
                  alt="Logo"
                  className="h-[20px] object-contain absolute z-10"
                />
              </div>
              <div className="col-span-4 bg-gradient-to-t from-black to-transparent h-[20px] w-full absolute top-[364px]"></div>
              <div className="flex flex-col justify-between flex-grow mt-4 px-4 overflow-hidden">
                <h2
                  className={`font-bold text-[#c1c1c1]  ${getTitleFontSize(
                    item.title
                  )}`}
                >
                  {item.title}
                </h2>
                <div className="mb-2">
                  <p className="text-[#555050] text-[6px]">
                    Published On : {item.publicationDate} | Not for commercial
                    use
                  </p>
                  <p className="text-[#555050] text-[6px] break-words">
                    Source : {item.logo}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center xs:w-[500px] sm:w-[800px] lg:w-[1250px] 2xl:w-[1900px]  my-12">
            <p className="text-3xl font-bold text-red-600">No Data Available</p>
          </div>
        )}
      </div>
      {displayData?.length > 0 && count !== 0 && (
        <div className="mb-4 flex justify-center mx-4 ">
          <button
            onClick={() => {
              count < displayData.length && setCount(count + 8);
            }}
            disabled={count >= displayData.length}
            className={`bg-teal-400 py-2 px-4 rounded-lg text-white font-semibold ${
              count >= displayData.length
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            {count >= displayData.length
              ? "No More Feeds Available"
              : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}

export default RssFeed;
