import html2canvas from "html2canvas";
import { useState } from "react";
import { DATA_ARRAY } from "./constant";

function RssFeed() {
  const [inputValue, setInputValue] = useState("");
  const [searchData, setSearchData] = useState([]);

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
      if (length > 100) return "40px";
      if (length > 75) return "44px";
      if (length > 50) return "55px";
      if (length < 50) return "60px";
      if (length < 30) return "80px";
      if (length < 15) return "100px";
      return "32px";
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
    clonedImageContainer.style.width = "100%";
    clonedImageContainer.style.height = "70%";
    clonedImageContainer.style.overflow = "hidden";

    clonedImage.style.width = "100%";
    clonedImage.style.height = "100%";
    clonedImage.style.objectFit = "contain";
    clonedImage.style.display = "block";

    clonedImageContainer.appendChild(clonedImage);
    clonedElement.insertBefore(clonedImageContainer, clonedElement.firstChild);

    const gradientOverlay = document.createElement("div");
    gradientOverlay.style.position = "absolute";
    gradientOverlay.style.bottom = "-0.1%";
    gradientOverlay.style.left = "0";
    gradientOverlay.style.width = "100%";
    gradientOverlay.style.height = "10%";
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
      clonedTitle.style.lineHeight = "1.2";
      clonedTitle.style.position = "relative";
      clonedTitle.style.zIndex = "2";
    }

    const clonedUrlLogoContainer = clonedElement.querySelector("div.relative");
    const clonedUrlLogo = clonedUrlLogoContainer.querySelector("img");
    clonedUrlLogo.style.width = "60px";
    clonedUrlLogo.style.height = "60px";
    clonedUrlLogo.style.objectFit = "contain";
    clonedUrlLogo.style.margin = "0 auto";
    clonedUrlLogo.style.position = "absolute";
    clonedUrlLogo.style.zIndex = "10";

    const clonedDate = clonedElement.querySelector("p:nth-of-type(1)");
    clonedDate.style.fontSize = "32px";
    clonedDate.style.marginTop = "auto";
    clonedDate.style.padding = "10px 20px 20px 20px";

    const clonedUrl = clonedElement.querySelector("p:nth-of-type(2)");
    clonedUrl.style.fontSize = "20px";
    clonedUrl.style.marginTop = "auto";
    clonedUrl.style.padding = "10px 20px 20px 20px";

    const gradientLine = clonedElement.querySelector(".bg-gradient-to-t");
    if (gradientLine) {
      gradientLine.style.display = "none";
    }

    html2canvas(offscreenElement, {
      useCORS: true,
      width: 1080,
      height: 1920,
      scale: 2,
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

  const handleSearch = () => {
    const filteredData = DATA_ARRAY.filter((item) =>
      item.urllogo.includes(inputValue)
    );
    setSearchData(filteredData);
  };

  const displayData = searchData?.length > 0 ? searchData : DATA_ARRAY;

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
          onClick={() => setInputValue("")}
          className="mx-4 bg-red-400 px-4 py-2 rounded-lg text-white font-medium"
        >
          Clear
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4 overflow-x-hidden">
        {displayData.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer rounded shadow-lg bg-black flex flex-col "
            onClick={(e) => downloadImage(e.currentTarget)}
          >
            <img
              src={item.imageurl}
              alt={item.title}
              className="w-full h-96 object-cover rounded-t"
            />

            <div className="flex items-center justify-center relative ">
              <img
                src={item.urllogo}
                alt="Logo"
                className="h-10 w-10 object-contain absolute z-10"
              />
            </div>
            <div className="bg-gradient-to-t from-black to-transparent h-[20px] xs:w-[200px] lg:w-[295.5px] md:w-[227px] 2xl:w-[460px] absolute md:top-[495px]"></div>

            <div className="flex flex-col justify-between flex-grow mt-4 p-4 overflow-hidden">
              <h2
                className={`font-bold text-white ${getTitleFontSize(
                  item.title
                )}`}
              >
                {item.title}
              </h2>
              <div className="mt-auto">
                <p className="text-gray-500 text-sm mt-2">{item.date}</p>
                <p className="text-gray-500 text-[10px] break-words">
                  {item.urllogo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default RssFeed;
