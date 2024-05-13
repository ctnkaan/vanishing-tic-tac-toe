import './App.css'
import Box from './components/Box'
import { IBoxState } from './types/types'
import { useGameStateStore } from './store/gameStateStore'

function App() {
    const { gameState } = useGameStateStore()

    return (
        <div
            style={{
                width: '400px',
                height: '400px',
                border: '1px solid blue',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                margin: 'auto',
            }}
        >
            {gameState.map((row: IBoxState[], rowIndex: number) => (
                <div
                    key={rowIndex}
                    style={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                    }}
                >
                    {row.map((_value: IBoxState, colIndex: number) => (
                        <Box rowIndex={rowIndex} colIndex={colIndex} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default App
