import { FlashList } from "@shopify/flash-list";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { useAnimeGenresStore } from "../state/useAnimeGenresStore";
import { useAnimeStore } from "../state/useAnimeStore";
import { FetchAnimeGenresResponse as Genre } from "../types/jikan";
import Typography from "./shared/Typography";

const NoGenre: Genre = {
  mal_id: -1,
  name: "All",
  url: "",
  count: 0,
};

function GenreItem({ genre }: { genre: Genre }) {
  const setSelectedGenre = useAnimeGenresStore((s) => s.setSelectedGenre);
  const fetchNextPage = useAnimeStore((s) => s.fetchNextPage);
  return (
    <ViewGenreItem>
      <Pressable
        onPress={async () => {
          setSelectedGenre(String(genre.mal_id));
          await fetchNextPage();
        }}
      >
        <Typography>{genre.name}</Typography>
      </Pressable>
    </ViewGenreItem>
  );
}

export default function GenreList() {
  const genres = useAnimeGenresStore((s) => s.genres);
  const list = [NoGenre, ...Object.values(genres)];

  return (
    <FlashList
      horizontal
      data={list}
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
