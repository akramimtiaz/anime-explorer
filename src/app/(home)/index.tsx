import AnimeList from "@/src/components/AnimeList";
import GenreList from "@/src/components/GenreList";
import LoadingAnimeList from "@/src/components/LoadingAnimeList";
import Page from "@/src/components/shared/Page";
import { useAnimeGenresStore } from "@/src/state/useAnimeGenresStore";
import { useAnimeStore } from "@/src/state/useAnimeStore";
import { useFavouriteStore } from "@/src/state/useFavouriteStore";
import { useEffect } from "react";

export default function Index() {
  const loadFavourites = useFavouriteStore((s) => s.loadFavourites);
  const loadGenres = useAnimeGenresStore((s) => s.loadGenres);

  const fetchFirstPage = useAnimeStore(s => s.fetchFirstPage);
  const fetchNextPage = useAnimeStore(s => s.fetchNextPage);
  const list = useAnimeStore(s => s.list);
  const loadingFirstPage = useAnimeStore(s => s.loadingFirstPage);  

  useEffect(() => {
    loadGenres();
    fetchFirstPage();
    loadFavourites();
  }, []);

  return (
    <Page>
      <GenreList />
      {loadingFirstPage ? (
        <LoadingAnimeList />
    ) : (
        <AnimeList list={list} fetchNextPage={fetchNextPage} />
      )}
    </Page>
  );
}
