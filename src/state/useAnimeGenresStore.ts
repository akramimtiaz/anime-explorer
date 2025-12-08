import { create } from "zustand";
import { getAnimeGenresFromStorage, saveAnimeGenres } from "../api/genres";
import { fetchAnimeGenres } from "../api/jikan";
import { FetchAnimeGenresResponse as AnimeGenre } from "../types/jikan";

type AnimeGenresStore = {
  selectedGenre: AnimeGenre | null;
  genres: Record<string, AnimeGenre>;
  loadGenres: () => Promise<AnimeGenre[]>;
  getGenres: () => Promise<void>;
  setSelectedGenre: (genreId: string) => void;
};

export const useAnimeGenresStore = create<AnimeGenresStore>(
  (set, get) => ({
    selectedGenre: null,
    genres: {},

    loadGenres: async () => {
      const storedGenres = await getAnimeGenresFromStorage();
      if (Array.isArray(storedGenres) && storedGenres?.length) {
        return storedGenres;
      }
      
      const fetchedGenres = await fetchAnimeGenres();
      await saveAnimeGenres(fetchedGenres);

      return fetchedGenres;
    },
    getGenres: async () => {
      const genresArray = await get().loadGenres();
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
