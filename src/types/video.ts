export interface Video {
  id: string
  key: string // Este es el ID de YouTube
  name: string
  site: string // Usualmente "YouTube"
  type: string // "Trailer", "Teaser", "Featurette"
  official: boolean
}
