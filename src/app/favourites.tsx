import { FlashList } from "@shopify/flash-list";
import AnimeListCard from "../components/AnimeListCard";
import LoadingAnimeList from "../components/LoadingAnimeList";
import Page from "../components/shared/Page";
import { useFavouriteStore } from "../state/useFavouriteStore";

export default function Favourites() {
  const favourites = useFavouriteStore((s) => s.favourites);
  const loadingFavourites = useFavouriteStore((s) => s.loadingFavourites);

  return (
    <Page>
      {loadingFavourites ? (
        <LoadingAnimeList />
      ) : (
        <FlashList
          masonry
          data={Object.values(favourites)}
          numColumns={2}
          renderItem={({ item }) => <AnimeListCard anime={item} />}
          keyExtractor={(item) => String(item.mal_id)}
        />
      )}
    </Page>
  );
}
