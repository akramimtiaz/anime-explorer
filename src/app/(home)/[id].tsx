import Page from "@/src/components/shared/Page";
import Typography from "@/src/components/shared/Typography";
import { useFavouriteStore } from "@/src/state/useFavouriteStore";
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import styled from 'styled-components/native';

const { height: screenHeight } = Dimensions.get('window');

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
    <Page>
      <ScrollView>
        <Stack.Screen options={{ title: anime.title }} />
        <View
          style={{
            position: "relative",
            height: Math.floor(screenHeight * 0.55),
          }}
        >
          <Image
            style={{
              height: Math.floor(screenHeight * 0.55),
              width: "100%",
            }}
            source={anime.images.webp.large_image_url}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.75)", "transparent", "transparent"]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 1 }} // start at bottom
            end={{ x: 0, y: 0 }} // end at top
          />
        </View>
        <ContentContainer>
          <Typography style={{ textAlign: "center" }} size="l">
            {anime.title}
          </Typography>
          <Typography>{anime.synopsis}</Typography>
          <Typography>{anime.score}</Typography>
        </ContentContainer>
      </ScrollView>
    </Page>
  );
}

const ContentContainer = styled.View`
  flex-direction: column;
  padding-vertical: ${({ theme }) => theme.gap.m};
  padding-horizontal: ${({ theme }) => theme.gap.s};
  gap: ${({ theme }) => theme.gap.s};
`;