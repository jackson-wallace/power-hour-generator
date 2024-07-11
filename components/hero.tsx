"use client";

import { useVideos } from "@/context/video-context";
import DropdownItem from "./dropdown-item";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {};

const Hero = (props: Props) => {
  const { videos, setVideos, searchVideos, setSearchVideos } = useVideos();
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  function decodeHtmlEntities(text: string): string {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  const fetchSearchResults = async (query: string) => {
    const response = await fetch(`/api/search/${query}`);
    const data = await response.json();
    const videos: Video[] = data.map((item: any) => ({
      id: item.id.videoId,
      title: decodeHtmlEntities(item.snippet.title),
      channel: item.snippet.channelTitle,
      length: "", // Set a default value or omit if not available
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      startAt: "00:00",
    }));
    setSearchVideos(videos);
  };

  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeoutId = setTimeout(() => {
      if (searchTerm) fetchSearchResults(searchTerm);
    }, 500);

    setDebounceTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearchResultClick = (video: Video) => {
    // Check if the video is already in the videos array by looking for its unique identifier (assuming it's `id`)
    const videoExists = videos.find((v) => v.id === video.id);

    // If the video does not exist, add it to the videos array
    if (!videoExists) {
      setVideos([...videos, video]);
    }
    // Optionally, clear the search results or handle the existing video case
    // setSearchVideos([]);
  };

  return (
    <div className="hero bg-base-200 min-h-screen max-h-screen flex flex-col">
      <div className="hero-content text-center mt-[12vh]">
        <div className=" max-w-2xl flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold">🍺 Power Hour Generator 🍺</h1>
          <div className="max-w-md">
            <p className="py-6">
              Search for music videos on YouTube Videos and add them to your
              Power Hour Playlist.
            </p>
            <label className="input input-bordered flex items-center gap-2">
              {/* <input type="text" className="grow" placeholder="Search" /> */}
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        {videos.length === 1 && (
          <div className="absolute top-0 left-0 z-50 text-sm opacity-50 w-full flex items-center justify-center transform -translate-y-1/3">
            Scroll down to see added music videos
          </div>
        )}
      </div>
      {searchVideos.length > 0 && (
        <div>
          <div className="divider"></div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow w-full overflow-auto"
          >
            {searchVideos.map((video) => (
              <li key={video.id}>
                <a onClick={() => handleSearchResultClick(video)}>
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    width={480}
                    height={360}
                    className="rounded-md max-w-32"
                  />
                  <div className="ml-4 flex flex-col items-start">
                    <div className="font-bold">{video.title}</div>
                    <div className="text-sm opacity-50">{video.channel}</div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Hero;
