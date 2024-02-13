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

export interface IRating {
  id: string
  userID: string
  gameID: number
  stars: number
  created_at: Date
}

export type IRatedGame = Pick<IGame, 'id' | 'cover' | 'name'>
