package main

import (
	"net/http"
)

const (
	//PORT represents the server port for our http server
	PORT = ":3001"
)

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(PORT, nil)
}
