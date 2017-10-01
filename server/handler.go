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

	//register client
	client := &Client{conn: conn}
	clients = append(clients, client)

	//send current grid state
	archive := Event{Event: "get", CanvasGrid: canvases, Id: -1, Src: ""}
	if err := client.conn.WriteJSON(archive); err != nil {
		fmt.Println(err)
	}
	
	for {

		var event Event

		err := conn.ReadJSON(&event)
		if err != nil {
			fmt.Println(err)
		}

		//update in memory archive
		if (event.Event == "update") {
			canvas := Canvas{Id: event.Id, Src: event.Src}
			for index, value := range canvases {
				if value.Id == canvas.Id {
					canvases[index] = canvas
				}
			}
		}

		for i, client := range clients {

			//exclude current client

			if err := client.conn.WriteJSON(event); err != nil {
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