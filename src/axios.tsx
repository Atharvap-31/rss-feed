import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.240.1.134:3000/v1",
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
