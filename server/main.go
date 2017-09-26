package main

import (
	"net/http"
	"golang.org/x/net/websocket"
	"fmt"
)

const (
	//PORT represents the server port for our http server
	PORT = ":3001"
)

func main() {
	http.Handle("/", websocket.Handler(NewConnection))
	http.ListenAndServe(PORT, nil)
}
