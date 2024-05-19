package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gorilla/websocket"
)


var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}


func handleWebSocket(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		http.Error(c.Writer, "Websocket error", http.StatusBadRequest)
		return
	}

	defer conn.Close()

	for {
    	messageType, message, err := conn.ReadMessage()
        if err != nil {
            break
        }

		fmt.Println(message)

		msg := "Hello Client"

        if err := conn.WriteMessage(messageType, []byte(msg)); err != nil {
            break
        }
    }
}