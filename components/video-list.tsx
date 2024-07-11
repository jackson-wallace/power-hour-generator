"use client";

import { useVideos } from "@/context/video-context";
import React, { useState } from "react";

type Props = {};

const VideoList = (props: Props) => {
  const { videos, setVideos } = useVideos();
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const removeVideo = (videoId: string) => {
    const updatedVideos = videos.filter((video) => video.id !== videoId);
    setVideos(updatedVideos);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;

    const newVideos = [...videos];
    const draggedItem = newVideos.splice(draggedIndex, 1)[0];
    newVideos.splice(index, 0, draggedItem);

    setVideos(newVideos);
    setDraggedIndex(null); // Reset dragged index
  };

  const handleEditClick = (videoId: string, startAt: string) => {
    setEditingVideoId(videoId);
    setEditValue(startAt);
  };

  const isValidTimeFormat = (time: string) => {
    const regex = /^\d{1,2}:\d{2}$/;
    return regex.test(time);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleBlur = () => {
    if (isValidTimeFormat(editValue)) {
      const updatedVideos = videos.map((video) => {
        if (video.id === editingVideoId) {
          return { ...video, startAt: editValue };
        }
        return video;
      });
      setVideos(updatedVideos);
      setEditingVideoId(null);
    } else {
      // Show error message
      showAlert("Invalid time format. Please use MM:SS format.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (isValidTimeFormat(editValue)) {
        // Apply the changes
        const updatedVideos = videos.map((video) => {
          if (video.id === editingVideoId) {
            return { ...video, startAt: editValue };
          }
          return video;
        });
        setVideos(updatedVideos);
        setEditingVideoId(null); // Close the input field
      } else {
        // Show error message and prevent closing the input field
        showAlert("Invalid time format. Please use MM:SS format.");
        event.preventDefault();
      }
    }
  };

  // Function to show alert
  const showAlert = (message: string) => {
    setAlertMessage(message); // Set the alert message
    setAlertVisible(true); // Show the alert

    // Optionally, hide the alert after a delay
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000); // Hide after 3 seconds
  };

  return videos.length > 0 ? (
    <div className="overflow-x-auto mx-8 flex flex-col items-center">
      {alertVisible && (
        <div
          role="alert"
          className="alert alert-error fixed inset-x-0 bottom-0 mx-auto p-4 text-center flex items-center justify-center space-x-2 z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{alertMessage}</span>
        </div>
      )}
      <table className="table w-4/5 leading-[2rem]">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Channel</th>
            <th className="flex flex-row">
              Start At{" "}
              <div
                className="tooltip tooltip-bottom"
                data-tip="Where the video starts playing"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="ml-1 h-4 w-4 shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr
              key={
                video.id /* Replace 'video.id' with the actual unique identifier */
              }
              draggable="true"
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              onMouseEnter={() => setHoveredVideoId(video.id)}
              onMouseLeave={() => setHoveredVideoId(null)}
              className="h-[2rem]"
            >
              <th className="h-[2rem]">{index + 1}</th>
              <td className="h-[2rem]">
                <div className="flex items-center gap-3">
                  <div>
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold hover:underline"
                    >
                      {video.title}
                    </a>
                  </div>
                </div>
              </td>
              <td className="h-[2rem]">{video.channel}</td>
              <td className="h-[2rem]">
                {editingVideoId === video.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="input input-bordered input-sm w-full max-w-[4rem]"
                  />
                ) : (
                  <span
                    onClick={() => handleEditClick(video.id, video.startAt)}
                    className="cursor-pointer"
                  >
                    {video.startAt}
                  </span>
                )}
              </td>
              <td className="h-[2rem] relative">
                <div
                  className={`absolute inset-0 flex justify-center items-center ${
                    hoveredVideoId === video.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <svg
                    onClick={() => removeVideo(video.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  ) : null;
};

export default VideoList;
