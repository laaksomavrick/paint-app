package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func handler(hub *Hub, w http.ResponseWriter, r *http.Request) {

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		fmt.Println(err)
		return
	}

	//register client
	client := &Client{hub: hub, conn: conn}
	client.hub.register <- client

	//send current grid state
	archive := Event{Event: "get", CanvasGrid: canvases, Id: -1, Src: ""}
	if err := client.conn.WriteJSON(archive); err != nil {
		fmt.Println(err)
	}

	for {

		var event Event

		//read event from client
		err := conn.ReadJSON(&event)
		if err != nil {
			fmt.Println(err)
		}

		//update in memory archive
		if event.Event == "update" {
			canvas := Canvas{Id: event.Id, Src: event.Src}
			for index, value := range canvases {
				if value.Id == canvas.Id {
					canvases[index] = canvas
				}
			}
		}

		//update clients
		for i, value := range hub.clients {

			if err := value.conn.WriteJSON(event); err != nil {
				//they disconnected
				if err := value.conn.Close(); err != nil {
					fmt.Println(err)
				}
				copy(hub.clients[i:], hub.clients[i+1:])
				hub.clients[len(hub.clients)-1] = nil
				hub.clients = hub.clients[:len(hub.clients)-1]
				return
			}
		}

	}

}
