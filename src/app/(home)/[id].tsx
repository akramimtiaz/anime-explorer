import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from "react-native";

export default function Details() {
  const router = useRouter();
  const { animeJson } = useLocalSearchParams();

  const anime = JSON.parse(animeJson as string);

  if (!anime) {
    router.dismiss();
    return;
  }

  return (
    <View>
      <Stack.Screen options={{ title: anime.title }} />
      <Image
        style={{
          height: 600,
          width: "auto",
        }}
        source={anime.images.webp.large_image_url}
        contentFit="cover"
      />
      <Text>Id Screen</Text>
    </View>
  );
}
