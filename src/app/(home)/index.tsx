import AnimeList from "@/src/components/AnimeList";
import GenreList from "@/src/components/GenreList";
import Typography from "@/src/components/shared/Typography";
import { useAnimeGenresStore } from "@/src/state/useAnimeGenresStore";
import { useAnimeStore } from "@/src/state/useAnimeStore";
import { useFavouriteStore } from "@/src/state/useFavouriteStore";
import { Suspense, use, useEffect } from "react";
import { View } from "react-native";

function HomeAnimeList() {
  use(useAnimeStore().fetchFirstPage());
  const fetchNextPage = useAnimeStore(s => s.fetchNextPage);
  const list = useAnimeStore(s => s.list);

  return (
    <AnimeList list={list} fetchNextPage={fetchNextPage} />
  );
};

export default function Index() {
  const loadFavourites = useFavouriteStore((s) => s.loadFavourites);
  const loadGenres = useAnimeGenresStore((s) => s.loadGenres);

  useEffect(() => {
    loadGenres();
    loadFavourites();
  }, []);
  
  return (
    <View style={{ flex: 1 }}>
      <GenreList />
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <HomeAnimeList />
      </Suspense>
    </View>
  );
}