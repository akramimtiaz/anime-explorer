import Page from "@/src/components/shared/Page";
import Typography from "@/src/components/shared/Typography";
import { useFavouriteStore } from "@/src/state/useFavouriteStore";
import { convertScore } from "@/src/utils";
import Entypo from '@expo/vector-icons/Entypo';
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { MotiView } from 'moti';
import { useState } from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from "react-native";
import styled, { useTheme } from 'styled-components/native';

const { height: screenHeight } = Dimensions.get('window');

export default function Details() {
  const theme = useTheme();
  const router = useRouter();
  const favourites = useFavouriteStore(s => s.favourites);
  const toggleFavourite = useFavouriteStore((s) => s.toggleFavourite);
  const [pressed, setPressed] = useState(false);

  const { animeJson } = useLocalSearchParams();

  const anime = JSON.parse(animeJson as string);

  if (!anime) {
    router.dismiss();
    return;
  }

  console.log({ anime: JSON.stringify(anime, null, 2) });

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
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              gap: 24,
            }}
          >
            <Pressable
              onPressIn={() => setPressed(true)}
              onPress={() => toggleFavourite(anime)}
              onPressOut={() => setPressed(false)}
            >
              <MotiView
                animate={{
                  scale: pressed ? 1.2 : 1,
                }}
                transition={{
                  type: 'spring',
                  damping: 40,
                }}
              >
                <Entypo
                  name={
                    favourites.hasOwnProperty(anime.mal_id)
                      ? "heart"
                      : "heart-outlined"
                  }
                  size={30}
                  color={theme.colors.primary}
                />
              </MotiView>
            </Pressable>
            <RatingContainer>
              <Entypo name="star" size={30} color={theme.colors.primary} />
              <Typography size="l">{convertScore(anime.score)}</Typography>
            </RatingContainer>
          </View>
          <Typography>{anime.synopsis}</Typography>
        </ContentContainer>
      </ScrollView>
    </Page>
  );
}

const ContentContainer = styled.View`
  flex-direction: column;
  padding-vertical: ${({ theme }) => theme.gap.m};
  padding-horizontal: ${({ theme }) => theme.gap.s};
  gap: ${({ theme }) => theme.gap.m};
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.gap.xs};
`;