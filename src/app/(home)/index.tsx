import AnimeListCard from "@/src/components/AnimeListCard";
import GenreList from "@/src/components/GenreList";
import { useAnimeGenresStore } from "@/src/state/useAnimeGenresStore";
import { useAnimeStore } from "@/src/state/useAnimeStore";
import { useFavouriteStore } from "@/src/state/useFavouriteStore";
import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const list = useAnimeStore((s) => s.list);
  const selectedGenre = useAnimeGenresStore((s) => s.selectedGenre);
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
      <FlashList
        masonry
        data={list}
        numColumns={2}
        renderItem={({ item }) => <AnimeListCard anime={item} />}
        keyExtractor={(item) => String(item.mal_id)}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchNextPage(selectedGenre?.mal_id)}
      />
    </View>
  );
}
