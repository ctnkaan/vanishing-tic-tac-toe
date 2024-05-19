import './App.css'
import Box from './components/Box/Box'
import { IBoxState } from './types/types'
import { useGameStateStore } from './store/gameStateStore'
import { useEffect, useState } from 'react'

function App() {
    const { gameState } = useGameStateStore()
    const [socket, setSocket] = useState() as any

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/ws')
        setSocket(socket)

        socket.onopen = function () {
            console.log('[open] Connection established')
        }

        socket.onmessage = function (event) {
            const data = JSON.parse(event.data)
            console.log(
                `[message] Data received from server: ${JSON.stringify(data)}`
            )
            // Update game state based on the received data
            if (data.type === 'UPDATE_GAME_STATE') {
                useGameStateStore.setState({ gameState: data.payload })
            }
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
    }, [])

    return (
        <div className="container">
            {gameState.map((row: IBoxState[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {row.map((_value: IBoxState, colIndex: number) => (
                        <Box
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            socket={socket}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default App
