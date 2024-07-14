import { useState, useEffect } from "react";

interface Artwork {
  id: number;
  title: string;
  image_id: string;
  artist_display: string;
  description: string | null;
}
const useFetch = (searchTerm: string, page: number) => {
  const [data, setData] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      const encodedSearchTerm = encodeURIComponent(searchTerm);

      try {
        const response = await fetch(
          searchTerm === ""
            ? `https://api.artic.edu/api/v1/artworks?page=${page}&fields=id,title,artist_display,description,image_id`
            : `https://api.artic.edu/api/v1/artworks/search?q=${encodedSearchTerm}&query[term][is_public_domain]=true&page=${page}&fields=id,title,artist_display,description,image_id`,
        );
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        const result = await response.json();
        const content: Artwork[] = result.data.map((item: Artwork) => ({
          id: item.id,
          title: item.title,
          image_id: item.image_id,
          artist_display: item.artist_display,
          description: item.description,
        }));
        setData(content);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [searchTerm, page]);

  return { data, loading, error };
};

export default useFetch;
