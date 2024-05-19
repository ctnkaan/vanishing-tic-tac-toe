import { Player, IBox } from '../../types/types'
import { useGameStateStore } from '../../store/gameStateStore'
import './Box.css'

const Box = ({ rowIndex, colIndex, socket }: IBox) => {
    const { gameState, setGameState, turn, toggleTurn, sendMove } =
        useGameStateStore()

    const handleBoxClick = (
        rowIndex: number,
        colIndex: number,
        player: Player
    ) => {
        setGameState(rowIndex, colIndex, player)
        sendMove(rowIndex, colIndex, player, socket)
        toggleTurn()
    }

    return (
        <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleBoxClick(rowIndex, colIndex, turn)}
            className="box"
        >
            <p className="content">{gameState[rowIndex][colIndex].content}</p>
        </div>
    )
}

export default Box
