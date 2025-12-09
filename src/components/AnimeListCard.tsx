import Entypo from '@expo/vector-icons/Entypo';
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { FetchAnimeByIdResponse as Anime } from "../types/jikan";
import { convertScore } from "../utils";
import Typography from "./shared/Typography";

interface AnimeListCardProps {
  anime: Anime;
}

export default function AnimeListCard({ anime }: AnimeListCardProps) {
  const router = useRouter();
  const theme = useTheme();

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
    <CardContainer>
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
      </Pressable>
      <CardFooter>
        <Typography numberOfLines={1}>{anime.title}</Typography>
        <RatingContainer>
          <Entypo name="star" size={12} color={theme.colors.primary} />
          <Typography>{convertScore(anime.score)}</Typography>
        </RatingContainer>
      </CardFooter>
    </CardContainer>
  );
}

const CardContainer = styled.View`
  flex-direction: column;
  gap: 10px;
  margin: 8px;
`;

const CardFooter = styled.View`
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gap.xs};
`;