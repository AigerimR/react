import { useState, useEffect } from "react";

interface Artwork {
  id: number;
  title: string;
  image_id: string;
  artist_display: string;
  description: string | null;
}
const useSingleFetch = (cardId: string) => {
  const [data, setData] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      if (!cardId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${cardId}?fields=id,title,artist_display,description,image_id`,
        );
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [cardId]);

  return { data, loading, error };
};

export default useSingleFetch;
