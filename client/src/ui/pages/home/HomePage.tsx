import Topbar from "@/components/Topbar";
import FeatureSections from "./components/FeatureSections";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/ui/stores/usePlayerStore";
import { useMusicStore } from "@/ui/stores/useMusicStore";

const HomePage = () => {
  const {
    fetchFeatureSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    madeForYouSongs,
    featureSongs,
    trendingSongs,
    isLoading,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeatureSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeatureSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featureSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      const allSongs = [...featureSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, featureSongs, trendingSongs]);
  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text3xl font-bold mb-6">Good afternoon</h1>
          <FeatureSections />

          <div className="space-y-8">
            <SectionGrid
              title="Made For You"
              songs={madeForYouSongs}
              isLoading={isLoading}
            ></SectionGrid>
            <SectionGrid
              title="Treding"
              songs={trendingSongs}
              isLoading={isLoading}
            ></SectionGrid>
            {/* <p>Trending</p> */}
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
