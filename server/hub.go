package main

var canvases = getInitialPaintState()

type Hub struct {
	clients    map[*Client]bool
	register   chan *Client
	unregister chan *Client
}

func hub() *Hub {
	return &Hub{
		clients:    make(map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

func (h *Hub) run() {

	for {

		select {

		case client := <-h.register:

			h.clients[client] = true

		case client := <-h.unregister:
			client.conn.Close()

			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
			}

		}

	}

}
