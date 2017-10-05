package main

var canvases = getInitialPaintState()

type Hub struct {
	clients []*Client
	register chan *Client
	unregister chan *Client
}

func hub() *Hub {
	return &Hub{
		clients: make([]*Client, 0),
		register: make(chan *Client),
		unregister: make(chan *Client),
	}
}

func (h *Hub) run() {

	for {

		select {

		case client := <-h.register:

			h.clients = append(h.clients, client)

		}

	}

}
