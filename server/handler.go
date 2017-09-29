package main

import (
	"github.com/gorilla/websocket"
	"fmt"
	"net/http"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
        return true
    },
}

var clients = make([]*Client, 0)

type Client struct {
	//hub *Hub

	// The websocket connection.
	conn *websocket.Conn

	// Buffered channel of outbound messages.
	//send chan []byte

}

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

	client := &Client{conn: conn}
	clients = append(clients, client)

	//client.hub.register <- client
	
	for {

		//todo handle client disconnect

		var m interface{}

		err := conn.ReadJSON(&m)
		if err != nil {
			fmt.Println(err)
		}

		fmt.Println(clients)

		for _, client := range clients {
			if err := client.conn.WriteJSON(m); err != nil {
				fmt.Println(err)
				//return
			}
		}

	}

    //... Use conn to send and receive messages.
}