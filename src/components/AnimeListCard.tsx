import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { FetchAnimeByIdResponse as Anime } from "../types/jikan";
import Typography from "./shared/Typography";

interface AnimeListCardProps {
  anime: Anime;
}

export default function AnimeListCard({ anime }: AnimeListCardProps) {
  const router = useRouter();

  const goToDetail = useCallback(() => {
    const toStringify: Anime = {
      mal_id: anime.mal_id,
      title: anime.title,
      rating: anime.rating,
      score: anime.score,
      scored_by: anime.scored_by,
      synopsis: anime.synopsis,
      images: anime.images,
    };

    router.push({
      pathname: "/[id]",
      params: {
        id: anime.mal_id,
        animeJson: JSON.stringify(toStringify),
      },
    });
  }, [anime, router]);

  return (
    <ItemContainer>
      <Pressable onPress={goToDetail}>
        <Image
          cachePolicy="memory-disk"
          recyclingKey={String(anime.mal_id)}
          style={{
            height: 300,
            width: "auto",
          }}
          source={anime.images.webp.large_image_url}
          contentFit="cover"
        />
        <Typography numberOfLines={1}>{anime.title}</Typography>
      </Pressable>
      <Typography>{anime.score}</Typography>
    </ItemContainer>
  );
}

const ItemContainer = styled.View`
  flex-direction: column;
  gap: 6px;
  margin: 8px;
`;
