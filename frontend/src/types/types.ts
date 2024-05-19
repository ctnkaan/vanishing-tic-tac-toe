export interface IBoxState {
    content: Player | null
}

export type Player = 'X' | 'O'

export type GameState = IBoxState[][]

export interface IBox {
    rowIndex: number
    colIndex: number
    socket: any
}
