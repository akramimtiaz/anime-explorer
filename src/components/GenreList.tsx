import { FlashList } from "@shopify/flash-list";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { useFetchAnimeGenresStore } from "../state/useFetchAnimeGenres";
import { useFetchAnimeListStore } from "../state/useFetchAnimeList";
import { FetchAnimeGenresResponse as Genre } from "../types/jikan";
import Typography from "./shared/Typography";

const NoGenre: Genre = {
  mal_id: -1,
  name: "All",
  url: "",
  count: 0,
};

function GenreItem({ genre }: { genre: Genre }) {
  const setSelectedGenre = useFetchAnimeGenresStore((s) => s.setSelectedGenre);
  const fetchNextPage = useFetchAnimeListStore((s) => s.fetchNextPage);
  return (
    <ViewGenreItem>
      <Pressable
        onPress={async () => {
          setSelectedGenre(String(genre.mal_id));
          await fetchNextPage(genre.mal_id > 0 ? genre.mal_id : undefined);
        }}
      >
        <Typography>{genre.name}</Typography>
      </Pressable>
    </ViewGenreItem>
  );
}

export default function GenreList() {
  const loading = useFetchAnimeGenresStore((s) => s.loading);
  const genres = useFetchAnimeGenresStore((s) => s.genres);
  const error = useFetchAnimeGenresStore((s) => s.error);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error</Typography>;
  }

  return (
    <FlashList
      horizontal
      data={[NoGenre, ...Object.values(genres)]}
      renderItem={({ item }) => <GenreItem genre={item} />}
      keyExtractor={(item) => String(item.mal_id)}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const ViewGenreItem = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: 6px;
  padding-horizontal: 12px;
  background-color: #ffcc98;
  margin: 16px;
  border-radius: 8px;
`;
