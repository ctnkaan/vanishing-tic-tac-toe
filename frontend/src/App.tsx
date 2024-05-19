import './App.css'
import Box from './components/Box/Box'
import { IBoxState } from './types/types'
import { useGameStateStore } from './store/gameStateStore'

function App() {
    const { gameState } = useGameStateStore()

    return (
        <div className="container">
            {gameState.map((row: IBoxState[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {row.map((_value: IBoxState, colIndex: number) => (
                        <Box rowIndex={rowIndex} colIndex={colIndex} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default App
