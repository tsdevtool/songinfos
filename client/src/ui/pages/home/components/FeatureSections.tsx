import FeaturedGridSkeleton from "@/ui/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/ui/stores/useMusicStore";

const FeatureSections = () => {
  const { isLoading, error, featureSongs } = useMusicStore();

  //   console.log(featureSongs);
  if (isLoading) return <FeaturedGridSkeleton />;

  if (error) {
    return <p className="text-red-500 mb04 text-lg">{error}</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featureSongs.map((song) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-16 sm:w-20 object-cover flex-shrink-0 "
          />
          <div className="flex-1 p-4">
            <p className="font-medium truncate">{song.title}</p>
            <p className="font-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        </div>

        //TODO: add play button
      ))}
    </div>
  );
};

export default FeatureSections;
