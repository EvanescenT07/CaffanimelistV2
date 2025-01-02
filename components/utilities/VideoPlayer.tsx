"use client";

import { useState } from "react";
import YouTube from "react-youtube";
import { FaYoutube } from "react-icons/fa";
import { FiXCircle } from "react-icons/fi";
import toast from "react-hot-toast";

interface VideoPlayerProps {
  videoID: string;
}

const VideoPlayer = ({ videoID }: VideoPlayerProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const videoPlayerhandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  const option = {
    width: "350",
    height: "250",
  };

  const YoutubePlayer = () => {
    return (
      <button
        title="Youtube Player"
        onClick={videoPlayerhandler}
        className="fixed bottom-5 right-5 text-light-text dark:text-dark-text"
      >
        <FaYoutube className="text-2xl" />
      </button>
    );
  };

  const YoutubeVideo = () => {
    return (
      <div className="fixed bottom-2 right-2">
        <button title="Close Youtube Player" onClick={videoPlayerhandler}>
          <FiXCircle className="text-2xl" />
        </button>
        <YouTube
          videoId={videoID}
          onReady={(event) => event.target.pauseVideo()}
          opts={option}
          onError={() => {
            toast.error("Video not found");
          }}
        />
      </div>
    );
  };

  return isOpen ? <YoutubePlayer /> : <YoutubeVideo />;
};

export default VideoPlayer;
