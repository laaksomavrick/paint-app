package main

import (
	"encoding/json"
	"net/http"
)

const (
	//PORT represents the server port for our http server
	PORT = ":3001"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	m := make(map[string]string)
	m["hello"] = "worldaaa"
	json.NewEncoder(w).Encode(m)
}

func main() {
	http.HandleFunc("/", helloHandler)
	http.ListenAndServe(PORT, nil)
}
