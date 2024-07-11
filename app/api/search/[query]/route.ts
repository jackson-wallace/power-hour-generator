type Params = {
  query: string;
};

export const GET = async (req: Request, { params }: { params: Params }) => {
  if (!params.query) {
    return new Response("Query is required", { status: 400 });
  }

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&type=video&q=${encodeURIComponent(
    params.query
  )}&key=${YOUTUBE_API_KEY}`;

  try {
    const youtubeResponse = await fetch(YOUTUBE_API_URL);
    const youtubeData = await youtubeResponse.json();

    if (youtubeData.error) {
      return new Response("Failed to fetch data from YouTube", { status: 500 });
    }

    return new Response(JSON.stringify(youtubeData.items), { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
};
