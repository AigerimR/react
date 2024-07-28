import { rest } from "msw";

export const handlers = [
  rest.get(`https://api.artic.edu/api/v1/artworks`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: 23700,
            title: "Artwork Title",
            artist_display: "Artist Name",
            image_id: "image_id",
            description: "Artwork Description",
          },
        ],
      }),
    );
  }),
  rest.get(`https://api.artic.edu/api/v1/artworks/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        data: {
          id: Number(id),
          title: "Artwork Title",
          artist_display: "Artist Name",
          image_id: "image_id",
          description: "Artwork Description",
        },
      }),
    );
  }),
];
