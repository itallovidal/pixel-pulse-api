interface ICover {
  id: number
  url: string
}

interface Platform {
  id: number
  name: string
}

export interface IGame {
  id: number
  cover: ICover
  name: string
  platforms: Platform[]
  summary: string
  first_release_date: number
  releaseDate: string
}
