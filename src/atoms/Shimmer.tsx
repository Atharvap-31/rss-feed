import React from "react";

const Shimmer = ({ className }) => {
  return <div className={`${className} shimmer`}></div>;
};

export default Shimmer;
// const downloadImage = (element: any) => {
//     const getTitleFontSizeInPX = (title: string) => {
//       const length = title.length;
//       if (length > 100) return "40px";
//       if (length > 75) return "44px";
//       if (length > 50) return "55px";
//       if (length < 50) return "60px";
//       if (length < 30) return "80px";
//       if (length < 15) return "100px";
//       return "32px";
//     };

//     const offscreenElement = document.createElement("div");
//     offscreenElement.style.width = "1080px";
//     offscreenElement.style.height = "1920px";
//     offscreenElement.style.position = "absolute";
//     offscreenElement.style.left = "-9999px";
//     offscreenElement.style.top = "0";
//     offscreenElement.style.overflow = "hidden";
//     offscreenElement.style.backgroundColor = "black";

//     const clonedElement = element.cloneNode(true);
//     clonedElement.style.width = "100%";
//     clonedElement.style.height = "100%";
//     clonedElement.style.display = "flex";
//     clonedElement.style.flexDirection = "column";
//     clonedElement.style.position = "relative";
//     offscreenElement.appendChild(clonedElement);
//     document.body.appendChild(offscreenElement);

//     const clonedImage = clonedElement.querySelector(
//       "img:first-of-type"
//     ) as HTMLImageElement;
//     const clonedImageContainer = document.createElement("div");
//     clonedImageContainer.style.position = "relative";
//     clonedImageContainer.style.width = "100%";
//     clonedImageContainer.style.height = "60%";
//     clonedImageContainer.style.overflow = "hidden";

//     clonedImage.style.width = "100%";
//     clonedImage.style.height = "100%";
//     clonedImage.style.objectFit = "cover";
//     clonedImage.style.display = "block";

//     clonedImageContainer.appendChild(clonedImage);
//     clonedElement.insertBefore(clonedImageContainer, clonedElement.firstChild);

//     const gradientOverlay = document.createElement("div");
//     gradientOverlay.style.position = "absolute";
//     gradientOverlay.style.bottom = "-0.1%";
//     gradientOverlay.style.left = "0";
//     gradientOverlay.style.width = "100%";
//     gradientOverlay.style.height = "10%";
//     gradientOverlay.style.background =
//       "linear-gradient(to top, rgba(0, 0, 0, 10), rgba(0, 0, 0, 0))";
//     gradientOverlay.style.zIndex = "1";
//     clonedImageContainer.appendChild(gradientOverlay);

//     const clonedTitle = clonedElement.querySelector("h2");
//     if (clonedTitle) {
//       const titleText = clonedTitle.innerText || "";
//       const fontSize = getTitleFontSizeInPX(titleText);

//       clonedTitle.style.fontSize = fontSize;
//       clonedTitle.style.padding = "20px";
//       clonedTitle.style.lineHeight = "1.2";
//       clonedTitle.style.position = "relative";
//       clonedTitle.style.zIndex = "2";
//     }

//     const clonedUrlLogoContainer = clonedElement.querySelector("div.relative");
//     const clonedUrlLogo = clonedUrlLogoContainer.querySelector("img");
//     // clonedUrlLogo.style.width = "400px";
//     clonedUrlLogo.style.height = "60px";
//     clonedUrlLogo.style.objectFit = "contain";
//     clonedUrlLogo.style.margin = "0 auto";
//     clonedUrlLogo.style.position = "absolute";
//     clonedUrlLogo.style.zIndex = "10";

//     const clonedDate = clonedElement.querySelector("p:nth-of-type(1)");
//     clonedDate.style.fontSize = "10px";
//     clonedDate.style.marginTop = "auto";
//     clonedDate.style.padding = "10px 20px 0px 20px";

//     const clonedUrl = clonedElement.querySelector("p:nth-of-type(2)");
//     clonedUrl.style.fontSize = "10px";
//     clonedUrl.style.marginTop = "auto";
//     clonedUrl.style.padding = "5px 20px 10px 20px";

//     const gradientLine = clonedElement.querySelector(".bg-gradient-to-t");
//     if (gradientLine) {
//       gradientLine.style.display = "none";
//     }

//     html2canvas(offscreenElement, {
//       useCORS: true,
//       width: 1080,
//       height: 1920,
//       scale: 1,
//       backgroundColor: null,
//     }).then((canvas) => {
//       const link = document.createElement("a");
//       link.href = canvas.toDataURL("image/png");
//       link.download = "image.png";
//       link.click();

//       if (gradientLine) {
//         gradientLine.style.display = "";
//       }

//       document.body.removeChild(offscreenElement);
//     });
//   };
