import Typography from "@/src/components/shared/Typography";
import { useFavouriteStore } from "@/src/state/useFavouriteStore";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Button, ScrollView } from "react-native";

export default function Details() {
  const router = useRouter();
  const favourites = useFavouriteStore(s => s.favourites);
  const toggleFavourite = useFavouriteStore((s) => s.toggleFavourite);
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
          favourites.hasOwnProperty(anime.mal_id)
            ? "Remove from Favourites"
            : "Add to Favourites"
        }
        onPress={() => toggleFavourite(anime)}
        color="blue"
      />
    </ScrollView>
  );
}
