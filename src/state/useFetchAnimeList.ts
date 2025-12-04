import { create } from "zustand";
import { fetchAnimeList } from "../api/jikan";
import { FetchAnimeListResponse } from "../types/jikan";

type FetchAnimeListStore = {
  currentPage: number;
  loading: boolean;
  error: Error | null;
  pagination: FetchAnimeListResponse["pagination"] | null;
  list: FetchAnimeListResponse["data"];
  fetchNextPage: () => Promise<void>;
};

export const useFetchAnimeListStore = create<FetchAnimeListStore>(
  (set, get) => ({
    currentPage: 0,
    loading: false,
    pagination: null,
    error: null,
    list: [],

    fetchNextPage: async () => {
      if (get().loading) return;
      if (get().pagination?.has_next_page === false) return;

      try {
        set(() => ({ loading: true }));
        const response = await fetchAnimeList(get().currentPage + 1);

        set((state) => ({
          currentPage: state.currentPage + 1,
          pagination: response.pagination,
          list: [...state.list, ...response.data],
        }));
      } catch (err) {
        console.error(err);
        set(() => ({ error: err as unknown as Error }));
      } finally {
        set(() => ({ loading: false }));
      }
    },
  })
);
