import { FetchAnimeByIdResponse, FetchAnimeGenresResponse, FetchAnimeListResponse } from '../types/jikan';

const BASE_URL = 'https://api.jikan.moe/v4';

// can move this into it's own util function
const getUrl = (path: string, queryParams: object = {}) => {
  let url = BASE_URL.concat(path);

  if (queryParams) {
    const params = Object.entries(queryParams)
      .map(([key, value]) => key.concat("=", String(value)));
    url = url.concat("?", params.join('&'));
  }

  return url;
};

export async function fetchAnimeList(page: number = 1): Promise<FetchAnimeListResponse> {
    try {
        let queryParams = { page, limit: 20, order_by: "popularity", sfw: true };
        const url = getUrl('/anime', queryParams);

        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function fetchAnimeById(id: number): Promise<FetchAnimeByIdResponse> {
    try {    
        const response = await fetch(getUrl(`/anime/${id}`));
        const data = await response.json();
        
        return data.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function fetchAnimeGenres(): Promise<FetchAnimeGenresResponse[]> {
    try {    
        const response = await fetch(getUrl(`/genres/anime`));
        const data = await response.json();
        
        return data.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
