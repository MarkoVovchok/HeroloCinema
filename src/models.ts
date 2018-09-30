export interface Movie {
    imdbID: string,
    Title: string,
    Year: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Released?: Date,
    Plot?: string,
    Poster?: string,
    imdbRating?: string,
}
export interface MovieMetaData {
    Title: string,
    Year: string,
    imdbID: string,
    Poster?: string
}
export interface MovieSearchResults{
    Search: MovieMetaData[],
    totalResults?: string,
    Response?: boolean
}
export const API_KEY = "apikey=bc2f8f5a"
export const DEFAULT_IMAGE = "assets/pics/noimga.jpg"
