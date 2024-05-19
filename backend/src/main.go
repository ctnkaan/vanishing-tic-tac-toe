package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", func (ctx *gin.Context)  {
		ctx.String(http.StatusOK, "Hello World!")
	})

	router.GET("/ws", func(ctx *gin.Context) {
		handleWebSocket(ctx)
	})

	router.Run(":8080")
}