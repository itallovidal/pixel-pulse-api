interface Platform {
  id: number
  name: string
}

export interface IGame {
  id: number
  cover: {
    id: number
    url: string
  }
  name: string
  platforms: Platform[]
  summary: string
  first_release_date: number
  releaseDate: string
}

export interface IRatedGames {
  id: number
  cover: {
    id: number
    url: string
  }
  name: string
}

export interface IRating {
  id: string
  userID: string
  gameID: number
  stars: number
  created_at: Date
}

export type IRatedGame = Pick<IGame, 'id' | 'cover' | 'name'>
