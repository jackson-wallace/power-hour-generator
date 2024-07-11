"use client";

import { useVideos } from "@/context/video-context";
import { useRouter } from "next/navigation";

type Props = {};

const Generate = (props: Props) => {
  const { videos } = useVideos();
  const router = useRouter();

  const handleWatchClick = () => {
    router.push("/watch");
  };

  return (
    videos.length > 0 && (
      <button className="btn btn-block btn-success" onClick={handleWatchClick}>
        Watch
      </button> // Step 3
    )
  );
};

export default Generate;
