import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import { Text, View } from "react-native";
import AnimeListCard from "../components/AnimeListCard";
import { useFavouriteAnimeStore } from "../state/useFavouriteAnime";

export default function Favourites() {
  const loadFavourites = useFavouriteAnimeStore((s) => s.loadFavourites);
  const loading = useFavouriteAnimeStore((s) => s.loading);
  const list = useFavouriteAnimeStore((s) => s.list);
  const error = useFavouriteAnimeStore((s) => s.error);

  useEffect(() => {
    loadFavourites();
  }, []);


  if (loading && !list.length) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Error...</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, }}>
      <FlashList
        masonry
        data={list}
        numColumns={2}
        renderItem={({ item }) => <AnimeListCard anime={item} />}
        keyExtractor={(item) => String(item.mal_id)}
      />
    </View>
  );
};

