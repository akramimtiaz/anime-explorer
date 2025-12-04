import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { FetchAnimeByIdResponse as Anime } from '../types/jikan';
import Typography from './shared/Typography';

interface AnimeListCardProps {
    anime: Anime;
};

export default function AnimeListCard({ anime }: AnimeListCardProps) {
    return (
      <ItemContainer>
        <Link href={`/${anime.mal_id}`} push asChild>
          <Pressable>
            <Image
              style={{
                height: 300,
                width: "auto",
              }}
              source={anime.images.webp.large_image_url}
              contentFit="cover"
            />
            <Typography numberOfLines={1}>{anime.title}</Typography>
          </Pressable>
        </Link>
        <Typography>{anime.score}</Typography>
      </ItemContainer>
    );
}

const ItemContainer = styled.View`
    flex-direction: column;
    gap: 6px;
    margin: 8px;
`;
