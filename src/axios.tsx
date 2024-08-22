import axios from "axios";

const instance = axios.create({
  baseURL: "https://4495-103-249-242-26.ngrok-free.app/v1",
});

export const createRssFeed = async (rssFeedUrl: string) => {
  const data = {
    url: rssFeedUrl,
  };

  try {
    const response = await instance.post("/rss-feed", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("API error:");
    throw error;
  }
};
