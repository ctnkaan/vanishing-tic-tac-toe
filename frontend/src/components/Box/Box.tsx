import { Player, IBox } from '../../types/types'
import { useGameStateStore } from '../../store/gameStateStore'
import './Box.css'

const Box = ({ rowIndex, colIndex }: IBox) => {
    const { gameState, setGameState, turn, toggleTurn } = useGameStateStore()

    const handleBoxClick = (
        rowIndex: number,
        colIndex: number,
        player: Player
    ) => {
        setGameState(rowIndex, colIndex, player)
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
