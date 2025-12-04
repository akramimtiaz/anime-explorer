import { create } from "zustand";
import { fetchAnimeGenres } from "../api/jikan";
import { FetchAnimeGenresResponse as Genre } from "../types/jikan";

type FetchAnimeGenresStore = {
  selectedGenre: Genre | null;  
  genres: Record<string, Genre>;
  loading: boolean;
  error: Error | null;
  fetchGenres: () => Promise<void>;
  setSelectedGenre: (id: string) => void; 
};

export const useFetchAnimeGenresStore = create<FetchAnimeGenresStore>(
  (set) => ({
    selectedGenre: null,
    genres: {},
    loading: false,
    error: null,

    fetchGenres: async () => {
        try {
            set(() => ({ loading: true }));

            const genresArray = await fetchAnimeGenres();
            const _genres = genresArray.reduce((acc, genre) => {
                return { ...acc, [String(genre.mal_id)]: genre }
            }, {});
            set(() => ({ genres: _genres }));

        } catch (err) {
            console.error(err);
        } finally {
            set(() => ({ loading: false }))
        }
    },
    setSelectedGenre: (id: string) => {
        set((state) => ({ selectedGenre: state.genres[id] ?? null }));
    },
  })
);

