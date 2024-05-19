import { Player, IBox } from '../types/types'
import { useGameStateStore } from '../store/gameStateStore'

const Box = ({ rowIndex, colIndex }: IBox) => {
    const { gameState, setGameState } = useGameStateStore()

    const handleBoxClick = (
        rowIndex: number,
        colIndex: number,
        player: Player
    ) => {
        setGameState(rowIndex, colIndex, player)
    }

    return (
        <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleBoxClick(rowIndex, colIndex, 'O')}
            style={{
                width: '100px',
                height: '100px',
                border: '2px solid black',
                display: 'flex',
            }}
        >
            <p
                style={{
                    border: '1px solid green',
                    margin: 'auto',
                    justifyContent: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    fontSize: '80px',
                }}
            >
                {gameState[rowIndex][colIndex].content}
            </p>
        </div>
    )
}

export default Box
