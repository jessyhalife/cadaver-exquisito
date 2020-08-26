export type Player = {
    id: string
    nickname: string
}

export type Content = {
    player: string
    content: string
    createdAt: Date
}

export type Game = {
    slug: string
    description: string
    duration: number
    maxPlayers: number
    rounds: number
    createdAt: Date
    passcode: string
    status: 'created' | 'joining' | 'playing' | 'finished'
    createdBy: string //we should be use it when auth implemented
    players: Player[]
    content: Content[]
}