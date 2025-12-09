
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

export default function LoadingAnimeList() {
  const colorMode = 'dark';

  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        padding: 8,
      }}
      animate={{ backgroundColor: '#000000' }}
    >
      <Skeleton colorMode={colorMode} height={300} width={185} />
      <Skeleton colorMode={colorMode} height={300} width={185} />
      <Skeleton colorMode={colorMode} height={300} width={185} />
      <Skeleton colorMode={colorMode} height={300} width={185} />
    </MotiView>
  );
}
