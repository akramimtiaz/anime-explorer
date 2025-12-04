interface ImageUrls {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface FetchAnimeByIdResponse {
  mal_id: number;
  title: string;
  rating: string;
  score: number;
  scored_by: number;
  synopsis: string;
  images: {
    jpg: ImageUrls;
    webp: ImageUrls;
  };
}

interface PaginationItems {
  count: number;
  total: number;
  per_page: number;
}

interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: PaginationItems;
}

export interface FetchAnimeListResponse {
  data: FetchAnimeByIdResponse[];
  pagination: Pagination;
}

export interface FetchAnimeGenresResponse {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}
