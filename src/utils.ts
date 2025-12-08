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
