import { FlashList } from "@shopify/flash-list";
import { useAnimeGenresStore } from "../state/useAnimeGenresStore";
import { useAnimeStore } from "../state/useAnimeStore";
import AnimeListCard from "./AnimeListCard";

export default function AnimeList() {
  const selectedGenre = useAnimeGenresStore(s => s.selectedGenre);
  const list = useAnimeStore(s => s.list);
  const fetchNextPage = useAnimeStore(s => s.fetchNextPage);

  return (
    <FlashList
      masonry
      data={list}
      numColumns={2}
      renderItem={({ item }) => <AnimeListCard anime={item} />}
      keyExtractor={(item) => String(item.mal_id)}
      onEndReached={() => fetchNextPage(selectedGenre?.mal_id)}
      onEndReachedThreshold={0.5}
    />
  );
};