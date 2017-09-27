package main

import (
	"github.com/gorilla/websocket"
	"fmt"
	"net/http"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

// type Client struct {
// 	hub *Hub

// 	// The websocket connection.
// 	conn *websocket.Conn

// 	// Buffered channel of outbound messages.
// 	send chan []byte

// }

func handler(w http.ResponseWriter, r *http.Request) {

	conn, err := upgrader.Upgrade(w, r, nil)
	
    if err != nil {
        fmt.Println(err)
        return
	}

	//Conceptually, as a first step, i need:
		//a way to register clients on connect
		//a way to deregister clients on disconnect
		//a way to receive events from clients (pub)
		//a way to broadcast events to clients (sub)

	//client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256)}
	//client.hub.register <- client
	
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			return
		}
		if err := conn.WriteMessage(messageType, p); err != nil {
			return
		}
	}

    //... Use conn to send and receive messages.
}