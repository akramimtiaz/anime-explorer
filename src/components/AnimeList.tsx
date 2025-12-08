import { FlashList } from "@shopify/flash-list";
import { useAnimeGenresStore } from "../state/useAnimeGenresStore";
import { useAnimeStore } from "../state/useAnimeStore";
import AnimeListCard from "./AnimeListCard";

export default function AnimeList() {
    const fetchNextPage = useAnimeStore((s) => s.fetchNextPage);
    const selectedGenre = useAnimeGenresStore((s) => s.selectedGenre);

    return (
      <FlashList
        masonry
        data={list}
        numColumns={2}
        renderItem={({ item }) => <AnimeListCard anime={item} />}
        keyExtractor={(item) => String(item.mal_id)}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetchNextPage(selectedGenre?.mal_id)}
      />
    )
};