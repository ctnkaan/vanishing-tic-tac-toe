import { create } from 'zustand'
import { Player, GameState } from '../types/types'

export const useGameStateStore = create<GameStateStore>((set) => ({
    gameState: [
        [{ content: null }, { content: null }, { content: null }],
        [{ content: null }, { content: null }, { content: null }],
        [{ content: null }, { content: null }, { content: null }],
    ],
    setGameState: (row, col, val) =>
        set((state) => {
            const newGameState = state.gameState.map((rowArray, rowIndex) =>
                rowIndex === row
                    ? rowArray.map((box, colIndex) =>
                          colIndex === col ? { ...box, content: val } : box
                      )
                    : rowArray
            )
            return { ...state, gameState: newGameState }
        }),
    turn: 'X',
    setTurn: (player: Player): void =>
        set((state) => ({ ...state, turn: player })),
}))

interface GameStateStore {
    gameState: GameState
    setGameState: (row: number, col: number, val: Player) => void
    turn: Player
    setTurn: (player: Player) => void
}
