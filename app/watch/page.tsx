"use client";

import { useVideos } from "@/context/video-context";
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faCompress,
  faForwardStep,
  faBackwardStep,
} from "@fortawesome/free-solid-svg-icons";

const Watch = () => {
  const { videos } = useVideos();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen state
  const playerRef = useRef<YouTube | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the container div

  const convertToSeconds = (timeStr: string) => {
    const [minutes, seconds] = timeStr.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const calculateEndTime = (startAt: string) => {
    const startTimeInSeconds = convertToSeconds(startAt);
    return startTimeInSeconds + 60;
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      start: videos[currentVideoIndex]
        ? convertToSeconds(videos[currentVideoIndex].startAt)
        : 0,
      end: videos[currentVideoIndex]
        ? calculateEndTime(videos[currentVideoIndex].startAt)
        : 60,
    },
  };

  const onReady = (event: { target: null }) => {
    playerRef.current = event.target;
    if (playerRef.current) {
      // @ts-ignore
      playerRef.current.playVideo();
    }
  };

  const onStateChange = (event: { data: number }) => {
    if (event.data === YouTube.PlayerState.ENDED) {
      if (currentVideoIndex < videos.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
      }
    }
  };

  useEffect(() => {
    if (playerRef.current && videos.length > 0) {
      // Additional safeguard
      if (!playerRef.current) {
        console.error("Player reference is null.");
        return;
      }
      // @ts-ignore
      playerRef.current.loadVideoById({
        videoId: videos[currentVideoIndex].id,
        startSeconds: convertToSeconds(videos[currentVideoIndex].startAt),
        endSeconds: calculateEndTime(videos[currentVideoIndex].startAt),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideoIndex, videos]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
      setIsFullscreen(true); // Update state
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false); // Update state
      }
    }
  };

  const goToNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <div ref={containerRef} className="h-screen w-screen">
      {videos.length > 0 && (
        <>
          <YouTube
            videoId={videos[currentVideoIndex].id}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
            className="h-full w-full"
          />
          <div className="absolute bottom-0 left-0 right-0 mx-auto mb-4 flex justify-center items-center z-50">
            <button onClick={goToPreviousVideo}>
              <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button onClick={toggleFullScreen} className="mx-4">
              {isFullscreen ? (
                <FontAwesomeIcon icon={faCompress} />
              ) : (
                <FontAwesomeIcon icon={faExpand} />
              )}
            </button>
            <button onClick={goToNextVideo}>
              <FontAwesomeIcon icon={faForwardStep} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Watch;
