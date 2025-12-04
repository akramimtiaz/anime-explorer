import { fetchAnimeById } from '@/src/api/jikan';
import { FetchAnimeByIdResponse as Anime } from '@/src/types/jikan';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function Details() {
    const { id } = useLocalSearchParams();
    const [anime, setAnime] = useState<Anime | null>(null);

    useEffect(() => {
        const load = async () => {
            const _anime = await fetchAnimeById(Number(id));
            setAnime(_anime);
        };

        load();
    }, [id]);

    if (!anime) {
        return null;
    }

    return (
        <View>
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
    )
};