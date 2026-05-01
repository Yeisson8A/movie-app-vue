import type { Movie } from './movie'

export interface MovieDetail extends Movie {
  genres: { id: number, name: string }[]
  runtime: number
  budget: number
  revenue: number
}
