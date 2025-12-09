import { FlashList } from "@shopify/flash-list";
import AnimeListCard from "../components/AnimeListCard";
import Page from "../components/shared/Page";
import { useFavouriteStore } from "../state/useFavouriteStore";

export default function Favourites() {
  const favourites = useFavouriteStore((s) => s.favourites);

  return (
    <Page>
      <FlashList
        masonry
        data={Object.values(favourites)}
        numColumns={2}
        renderItem={({ item }) => <AnimeListCard anime={item} />}
        keyExtractor={(item) => String(item.mal_id)}
      />
    </Page>
  );
}
