import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import AnimeListCard from "../components/AnimeListCard";
import { useFavouriteAnimeStore } from "../state/useFavouriteStore";

export default function Favourites() {
  const loading = useFavouriteAnimeStore((s) => s.loading);
  const favourites = useFavouriteAnimeStore((s) => s.favourites);
  const error = useFavouriteAnimeStore((s) => s.error);

  if (loading && !favourites) {
    return (
      <View style={{ flex: 1 }}>
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
      <FlashList
        masonry
        data={Object.values(favourites)}
        numColumns={2}
        renderItem={({ item }) => <AnimeListCard anime={item} />}
        keyExtractor={(item) => String(item.mal_id)}
      />
    </View>
  );
}
