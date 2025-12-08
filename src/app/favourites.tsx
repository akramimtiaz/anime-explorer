import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import AnimeListCard from "../components/AnimeListCard";
import { useFavouriteStore } from "../state/useFavouriteStore";

export default function Favourites() {
  const favourites = useFavouriteStore((s) => s.favourites);

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
