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
    sendMove: (row: number, col: number, player: Player, socket: any) => void
}

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
    sendMove: (row, col, player, socket) => {
        const move = JSON.stringify({ row, col, player })
        socket.send(move)
    },
}))
