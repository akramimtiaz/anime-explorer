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

export const convertScore = (score?: number): string | null => {
  if (!score || typeof score !== 'number') return null;
  
  const clamped = Math.min(Math.max(score, 0), 10);
  return (clamped / 2).toFixed(1);
};
