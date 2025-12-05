import AnimeListCard from "@/src/components/AnimeListCard";
import GenreList from "@/src/components/GenreList";
import { useFavouriteAnimeStore } from "@/src/state/useFavouriteAnime";
import { useFetchAnimeGenresStore } from "@/src/state/useFetchAnimeGenres";
import { useFetchAnimeListStore } from "@/src/state/useFetchAnimeList";
import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const loading = useFetchAnimeListStore((s) => s.loading);
  const list = useFetchAnimeListStore((s) => s.list);
  const error = useFetchAnimeListStore((s) => s.error);
  const selectedGenre = useFetchAnimeGenresStore((s) => s.selectedGenre);
  const fetchNextPage = useFetchAnimeListStore((s) => s.fetchNextPage);
  const loadFavourites = useFavouriteAnimeStore((s) => s.loadFavourites);
  const fetchGenres = useFetchAnimeGenresStore((s) => s.fetchGenres);

  useEffect(() => {
    fetchNextPage();
    loadFavourites();
    fetchGenres();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <GenreList />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Error...</Text>
      </View>
    );
  }

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
