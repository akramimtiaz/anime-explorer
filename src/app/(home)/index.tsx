import AnimeListCard from "@/src/components/AnimeListCard";
import { useFetchAnimeListStore } from "@/src/state/useFetchAnimeList";
import { FlashList } from '@shopify/flash-list';
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const loading = useFetchAnimeListStore((s) => s.loading);
  const list = useFetchAnimeListStore((s) => s.list);
  const error = useFetchAnimeListStore((s) => s.error);
  const fetchNextPage = useFetchAnimeListStore((s) => s.fetchNextPage);

  useEffect(() => {
    fetchNextPage();
  }, [])

  if (loading && !list.length) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Error...</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, }}>
      <FlashList
        masonry
        data={list}
        numColumns={2}
        renderItem={({ item }) => <AnimeListCard anime={item} />}
        keyExtractor={(item) => String(item.mal_id)}
        onEndReachedThreshold={0.5}
        onEndReached={fetchNextPage}
      />
    </View>
  );
}
