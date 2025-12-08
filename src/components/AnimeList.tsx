import { FlashList } from "@shopify/flash-list";
import { FetchAnimeByIdResponse as Anime } from "../types/jikan";
import AnimeListCard from "./AnimeListCard";

interface AnimeListProps {
  list: Anime[];
  fetchNextPage: () => void;
};

export default function AnimeList({ list, fetchNextPage }: AnimeListProps) {
  return (
    <FlashList
      masonry
      data={list}
      numColumns={2}
      renderItem={({ item }) => <AnimeListCard anime={item} />}
      keyExtractor={anime => String(anime.mal_id)}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.5}
    />
  );
};
