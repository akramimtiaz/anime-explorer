export const buildUrl = (baseUrl: string, path: string, queryParams: object = {}) => {
  let url = baseUrl.concat(path);

  if (queryParams) {
    const params = Object.entries(queryParams).map(([key, value]) =>
      key.concat("=", String(value))
    );
    url = url.concat("?", params.join("&"));
  }

  // console.log(url);
  return url;
};

export const convertRating = (rating?: number): number | null => {
  if (!rating) return null;
  
  const clamped = Math.min(Math.max(rating, 0), 10);
  return Math.round(clamped / 2);
};
