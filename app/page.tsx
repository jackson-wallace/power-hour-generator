import Generate from "@/components/generate";
import Hero from "@/components/hero";
import VideoList from "@/components/video-list";
import VideoProvider from "@/context/video-context";

export default function Home() {
  return (
    <div>
      <Hero />
      <VideoList />
      <Generate />
    </div>
  );
}
