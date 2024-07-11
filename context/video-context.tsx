"use client";

import { createContext, useContext, useState } from "react";

interface VideoContextType {
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
  searchVideos: Video[];
  setSearchVideos: React.Dispatch<React.SetStateAction<Video[]>>;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

const VideoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchVideos, setSearchVideos] = useState<Video[]>([
    // {
    //   id: "QrR_gm6RqCo",
    //   title: "Mac Miller: NPR Music Tiny Desk Concert",
    //   channel: "NPR Music",
    //   length: "",
    //   link: "https://www.youtube.com/watch?v=QrR_gm6RqCo",
    //   thumbnailUrl: "https://i.ytimg.com/vi/QrR_gm6RqCo/hqdefault.jpg",
    //   startAt: "00:00",
    // },
    // {
    //   id: "ferZnZ0_rSM",
    //   title: "Anderson .Paak & The Free Nationals: NPR Music Tiny Desk Concert",
    //   channel: "NPR Music",
    //   length: "",
    //   link: "https://www.youtube.com/watch?v=ferZnZ0_rSM",
    //   thumbnailUrl: "https://i.ytimg.com/vi/ferZnZ0_rSM/hqdefault.jpg",
    //   startAt: "00:00",
    // },
  ]);

  return (
    <VideoContext.Provider
      value={{ videos, setVideos, searchVideos, setSearchVideos }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideos must be used within a VideoProvider");
  }
  return context;
};
