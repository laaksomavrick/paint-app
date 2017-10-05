package main

import (
	"net/http"
)

const (
	//PORT represents the server port for our http server
	PORT = ":3001"
) 

func main() {
	hub := hub()
	go hub.run()
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		handler(hub, w, r)
	})
	http.ListenAndServe(PORT, nil)
}
