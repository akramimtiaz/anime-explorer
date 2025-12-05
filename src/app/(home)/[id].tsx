import Typography from "@/src/components/shared/Typography";
import { useFavouriteAnimeStore } from "@/src/state/useFavouriteAnime";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Button, ScrollView } from "react-native";

export default function Details() {
  const router = useRouter();
  const isFavourite = useFavouriteAnimeStore((s) => s.isFavourite);
  const loading = useFavouriteAnimeStore((s) => s.loading);
  const toggleFavourite = useFavouriteAnimeStore((s) => s.toggleFavourite);
  const { animeJson } = useLocalSearchParams();

  const anime = JSON.parse(animeJson as string);

  if (!anime) {
    router.dismiss();
    return;
  }

  return (
    <ScrollView>
      <Stack.Screen options={{ title: anime.title }} />
      <Image
        style={{
          height: 600,
          width: "auto",
        }}
        source={anime.images.webp.large_image_url}
        contentFit="cover"
      />
      <Typography>{anime.title}</Typography>
      <Typography>{anime.synopsis}</Typography>
      <Typography>{anime.score}</Typography>
      <Button
        title={
          isFavourite(String(anime.mal_id))
            ? "Remove from Favourites"
            : "Add to Favourites"
        }
        onPress={() => toggleFavourite(anime)}
        disabled={loading}
        color="blue"
      />
    </ScrollView>
  );
}
