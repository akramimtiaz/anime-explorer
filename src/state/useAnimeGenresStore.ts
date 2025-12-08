import { create } from "zustand";
import { getAnimeGenresFromStorage, saveAnimeGenres } from "../api/genres";
import { fetchAnimeGenres } from "../api/jikan";
import { FetchAnimeGenresResponse as AnimeGenre } from "../types/jikan";

type AnimeGenresStore = {
  selectedGenre: AnimeGenre | null;
  genres: Record<string, AnimeGenre>;
  getGenres: () => Promise<AnimeGenre[]>;
  loadGenres: () => Promise<void>;
  setSelectedGenre: (genreId: string) => void;
};

export const useAnimeGenresStore = create<AnimeGenresStore>(
  (set, get) => ({
    selectedGenre: null,
    genres: {},

    getGenres: async () => {
      const storedGenres = await getAnimeGenresFromStorage();
      if (Array.isArray(storedGenres) && storedGenres?.length) {
        return storedGenres;
      }
      
      const fetchedGenres = await fetchAnimeGenres();
      await saveAnimeGenres(fetchedGenres);

      return fetchedGenres;
    },
    loadGenres: async () => {
      const genresArray = await get().getGenres();
      const genres: Record<string, AnimeGenre> = {};
 
      for (const genre of genresArray) {
        genres[genre.mal_id] = genre;
      }
      
      set(() => ({ genres }));
    },
    setSelectedGenre: (genreId: string) => {
      set((state) => ({ selectedGenre: state.genres[genreId] ?? null }));
    },
  }),
);
