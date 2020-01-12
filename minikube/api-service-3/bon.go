package main

import "github.com/gin-gonic/gin"

func main() {
//     gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello from micro service 3 written in Go and Gin",
		})
	})
	r.Run("0.0.0.0:8001") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}