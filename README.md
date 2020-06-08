## Wooclap test

#### Requirements

- node 12.18.0
- yarn
- mongodb / docker

#### How to run

1. Start API

- Install dependecies > `yarn`
- Update values in `api/.env.example` if needed and rename it to `.env`
- Have your DB running (run `yarn db` to start a mongodb docker container)
- run `yarn api` on root or `cd api && yarn start`

2. Start APP

- Install dependecies > `yarn`
- Update values in `app/.env.example` if needed and rename it to `.env`
- run `yarn app` on root or `cd app && yarn start`

#### Env configs

1. API
   If you're running docker, `MONGO_INITDB_ROOT_*` in `./docker-compose.yml` must match `MONGO_USER` and `MONGO_PASSWORD` on `.env`.
   The `APP_ORIGIN` env variable is used to access uploaded images

2. APP
   Make sure `REACT_APP_API_URL` reflects the url and port the api is running on

#### API Endpoints

- `GET /api/movies?search=<string>`
  Gets 10 movies that match search param ordered alphabetically. If none provided it'll just fetch the first 10 movies

- `GET /api/movies/:id`
  Gets the details for the movie with the specified id. Returns 404 if no movie found with that id and 200 if successful

- `DELETE /api/movies/:id`
  Deletes the movie and image on server for the id received. Returns 404 if no movie found and 200 if successful

- `POST /api/movies`
  Creates a new movie. Expects a body with

```ts
{
  file: Blob; // optional
  rating: number;
  name: string;
  img: string;
  releaseDate: Date;
  genre: string;
}
```

Returns 201 if created and 400 if malformed object

- `PUT /api/movies/:id`
  Updates the movie that corresponds to the recieved id. Expects id to be string and a body with

```ts
{
  file: Blob; // optional
  rating: number;
  name: string;
  img: string;
  releaseDate: Date;
  genre: string;
}
```

Returns 200 if created and 400 if malformed object.
If a file is sent, removes old image and adds the new one
