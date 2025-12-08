import {
  FetchAnimeByIdResponse,
  FetchAnimeGenresResponse,
  FetchAnimeListResponse,
} from "../types/jikan";
import { buildUrl } from "../utils";

const BASE_API_URL = "https://api.jikan.moe/v4";

export async function fetchAnimeList(
  page: number = 1,
  genreId?: number,
): Promise<FetchAnimeListResponse> {
  try {
    const baseQueryParams = {
      page,
      limit: 20,
      order_by: "popularity",
      sfw: true,
    };
    const queryParams = genreId
      ? { ...baseQueryParams, genres: genreId }
      : baseQueryParams;
    const url = buildUrl(BASE_API_URL, "/anime", queryParams);

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchAnimeById(
  id: number,
): Promise<FetchAnimeByIdResponse> {
  try {
    const response = await fetch(buildUrl(BASE_API_URL, `/anime/${id}`));
    const data = await response.json();

    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function fetchAnimeGenres(): Promise<FetchAnimeGenresResponse[]> {
  try {
    const response = await fetch(buildUrl(BASE_API_URL, `/genres/anime`));
    const data = await response.json();

    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
