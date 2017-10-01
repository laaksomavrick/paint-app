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

func handler(w http.ResponseWriter, r *http.Request) {

	conn, err := upgrader.Upgrade(w, r, nil)
	
    if err != nil {
        fmt.Println(err)
        return
	}

	client := &Client{conn: conn}
	clients = append(clients, client)

	//client.hub.register <- client
	
	for {

		var m interface{}

		err := conn.ReadJSON(&m)
		if err != nil {
			fmt.Println(err)
		}

		for i, client := range clients {
			if err := client.conn.WriteJSON(m); err != nil {
				//they disconnected
				if err := client.conn.Close(); err != nil {
					fmt.Println(err)					
				}
				copy(clients[i:], clients[i+1:])
				clients[len(clients)-1] = nil
				clients = clients[:len(clients)-1]
				return
			}
		}

	}

}