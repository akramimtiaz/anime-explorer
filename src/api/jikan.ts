
const BASE_URL = 'https://api.jikan.moe/v4';

const getUrl = (path: string, queryParams: object = {}) => {
  let url = BASE_URL.concat(path);

  if (queryParams) {
    const params = Object.entries(queryParams)
      .map(([key, value]) => key.concat("=", value));
    url = url.concat("?", params.join('&'));
  }

  return url;
};

export async function fetchAnimeList(page: number = 1, limit: number = 20) {
    try {
        const url = getUrl('/anime', { page, limit });
        console.log('URL', url);

        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchAnimeById(id: number) {
    try {    
        const response = await fetch(getUrl(`/anime/${id}`));
        const data = await response.json();
        
        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function fetchAnimeGenres() {
    try {    
        const response = await fetch(getUrl(`/genres/anime`));
        const data = await response.json();
        
        return data;
    } catch (err) {
        console.error(err);
    }
}
