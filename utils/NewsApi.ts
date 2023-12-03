import { newsApiKey } from "./ApiKey";
import axios from "axios";

// Endpoints

const apiBaseUrl = "https://newsapi.org/v2";

const breakingNewsUrl = (country) => `${apiBaseUrl}/top-headlines?country=${country}&apiKey=${newsApiKey}`;
const recommendedNewsUrl = (country) => `${apiBaseUrl}/top-headlines?country=${country}&category=business&apiKey=${newsApiKey}`;

const discoverNewsUrl = (discover, country) =>
  `${apiBaseUrl}/top-headlines?country=${country}&category=${discover}&apiKey=${newsApiKey}`;

const searchNewsUrl = (query) =>
  `${apiBaseUrl}/everything?q=${query}&apiKey=${newsApiKey}`;

const newsApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchBreakingNews = async (country) => {
  return await newsApiCall(breakingNewsUrl(country));
};

export const fetchRecommendedNews = async (country) => {
  return await newsApiCall(recommendedNewsUrl(country));
};

export const fetchDiscoverNews = async (discover, country) => {
  return await newsApiCall(discoverNewsUrl(discover, country));
};


export const fetchSearchNews = async (query) => {
  const endpoint = searchNewsUrl(query);
  return await newsApiCall(endpoint);
};