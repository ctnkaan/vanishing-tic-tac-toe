import { create } from 'zustand'
import { Player, GameState } from '../types/types'

const initialGameState: GameState = [
    [{ content: null }, { content: null }, { content: null }],
    [{ content: null }, { content: null }, { content: null }],
    [{ content: null }, { content: null }, { content: null }],
]

interface GameStateStore {
    gameState: GameState
    setGameState: (row: number, col: number, val: Player) => void
    turn: Player
    toggleTurn: () => void
}

// Helper function to update the game state
const updateGameState = (
    gameState: GameState,
    row: number,
    col: number,
    val: Player
): GameState => {
    return gameState.map((rowArray, rowIndex) => {
        if (rowIndex === row) {
            return rowArray.map((box, colIndex) => {
                if (colIndex === col) {
                    return { ...box, content: val }
                }
                return box
            })
        }
        return rowArray
    })
}

// Function to toggle the turn between players
const toggleTurn = (currentTurn: Player): Player => {
    return currentTurn === 'X' ? 'O' : 'X'
}

export const useGameStateStore = create<GameStateStore>((set) => ({
    gameState: initialGameState,
    setGameState: (row, col, val) =>
        set((state) => ({
            gameState: updateGameState(state.gameState, row, col, val),
        })),
    turn: 'X',
    toggleTurn: () =>
        set((state) => ({
            turn: toggleTurn(state.turn),
        })),
}))
