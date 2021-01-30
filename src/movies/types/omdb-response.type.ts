type Rating = {
  Source: string
  Value: string
}

export type OmdbResponse = {
  Actors: string
  Awards: string
  Country: string
  Director: string
  Genre: string
  Language: string
  Metascore: string
  Plot: string
  Poster: string
  Rated: string
  Ratings: Rating[]
  Released: string
  Response: string
  Runtime: string
  Title: string
  Type: string
  Writer: string
  Year: string
  imdbID: string
  imdbRating: string
  imdbVotes: string
  totalSeasons: string
}
