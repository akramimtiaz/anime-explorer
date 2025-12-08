import AnimeList from "@/src/components/AnimeList";
import GenreList from "@/src/components/GenreList";
import Typography from "@/src/components/shared/Typography";
import { useAnimeGenresStore } from "@/src/state/useAnimeGenresStore";
import { useAnimeStore } from "@/src/state/useAnimeStore";
import { useFavouriteStore } from "@/src/state/useFavouriteStore";
import { Suspense, useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const fetchNextPage = useAnimeStore((s) => s.fetchNextPage);
  const loadFavourites = useFavouriteStore((s) => s.loadFavourites);
  const loadGenres = useAnimeGenresStore((s) => s.loadGenres);

  useEffect(() => {
    loadGenres();
    fetchNextPage();
    loadFavourites();
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <GenreList />
      <Suspense
        fallback={
          <View>
            <Typography>Loading...</Typography>
          </View>
        }
      >
        <AnimeList />
      </Suspense>
    </View>
  );
}