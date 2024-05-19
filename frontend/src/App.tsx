import './App.css'
import Box from './components/Box/Box'
import { IBoxState } from './types/types'
import { useGameStateStore } from './store/gameStateStore'

function App() {
    const { gameState } = useGameStateStore()
    const socket = new WebSocket('ws://localhost:8080/ws')

    socket.onopen = function () {
        console.log('[open] Connection established')
        socket.send('Hello Server!')
    }

    socket.onmessage = function (event) {
        console.log(`[message] Data received from server: ${event.data}`)
    }

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log(
                `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
            )
        } else {
            console.log('[close] Connection died')
        }
    }

    socket.onerror = function (error) {
        console.log(`[error] ${error}`)
    }

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
