import {
  FetchAnimeByGenreResponse,
  FetchAnimeByIdResponse,
  FetchAnimeGenresResponse,
} from "../types/jikan";
import { buildUrl } from "../utils";

const BASE_API_URL = "https://api.jikan.moe/v4";

export async function fetchAnimesByGenre(
  genreId?: number,
  page: number = 1,
): Promise<FetchAnimeByGenreResponse> {
  const queryParams = {
    page,
    limit: 20,
    order_by: "popularity",
    sfw: true,
    ...(genreId && { genres: genreId }),
  };  
  const url = buildUrl(BASE_API_URL, "/anime", queryParams);
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(`GET ${url}:`, err);
    throw err;
  }
}

export async function fetchAnimeById(
  id: number,
): Promise<FetchAnimeByIdResponse> {
  const url = buildUrl(BASE_API_URL, `/anime/${id}`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.data;
  } catch (err) {
    console.error(`GET ${url}:`, err);
    throw err;
  }
}

export async function fetchAnimeGenres(): Promise<FetchAnimeGenresResponse[]> {
  const url = buildUrl(BASE_API_URL, `/genres/anime`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.data;
  } catch (err) {
    console.error(`GET ${url}:`, err);
    throw err;
  }
}
