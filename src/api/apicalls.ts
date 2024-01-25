const apiKey: string = "5a7531a791704bb4b24befa4738dd37c";

export const baseImagePath= (size:string,path :string) => `https://image.tmdb.org/t/p/${size}${path}`

export const nowPlayingMovies: string = `

https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey};
`
export const upcomingMovies: string = `
https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey};

`
export const popularMovies: string = `
https://api.themoviedb.org/3/movie/popular?api_key=${apiKey};
`

export const searchMovies = (keyword: string) => `
https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword};
`

export const movieDetails = (movieId: string) => `
https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey};
`

export const movieCastDetails = (movieId: string) => `
https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey};


`
