import { fetchAnimeList } from "@/src/api/jikan";
import AnimeListCard from "@/src/components/AnimeListCard";
import { FetchAnimeByIdResponse as Anime } from "@/src/types/jikan";
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [data, setData] = useState<Anime[]>([]);

  useEffect(() => {
    const load = async () => {
      const _data = await fetchAnimeList();
      setData(_data.data);
    };
    load();
  }, []);

  if (!data) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, }}>
      <FlashList
        data={data ?? []}
        masonry
        numColumns={2}
        renderItem={({ item }) => <AnimeListCard anime={item} />}
      />
    </View>
  );
}
