import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Artwork {
  id: number;
  title: string;
  image_id: string;
  artist_display: string;
  description: string | null;
}
export interface QueryArguments {
  searchTerm: string;
  page: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.artic.edu/api/v1/" }),

  endpoints: (builder) => ({
    getListByPage: builder.query<Artwork[], QueryArguments>({
      query({ searchTerm, page }) {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        return {
          url:
            searchTerm === ""
              ? `https://api.artic.edu/api/v1/artworks?page=${page}&fields=id,title,artist_display,description,image_id`
              : `https://api.artic.edu/api/v1/artworks/search?q=${encodedSearchTerm}&query[term][is_public_domain]=true&page=${page}&fields=id,title,artist_display,description,image_id`,
          responseHandler: async (response: Response) => {
            if (response) {
              const result = await response.json();
              const content: Artwork[] = result.data.map((item: Artwork) => ({
                id: item.id,
                title: item.title,
                image_id: item.image_id,
                artist_display: item.artist_display,
                description: item.description,
              }));
              return content;
            } else {
              console.error("Response does not contain data:", response);
              return [];
            }
          },
        };
      },
    }),
  }),
});

export default api;
