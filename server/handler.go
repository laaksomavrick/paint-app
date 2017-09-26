package main

import (
	"golang.org/x/net/websocket"
)

func NewConnection(ws *websocket.Conn) {

    // var err error

    // for {
    //     var reply string

    //     if err = websocket.Message.Receive(ws, &reply); err != nil {
    //         fmt.Println("Can't receive")
    //         break
    //     }

    //     fmt.Println("Received back from client: " + reply)

    //     msg := "Received:  " + reply
    //     fmt.Println("Sending to client: " + msg)

    //     if err = websocket.Message.Send(ws, msg); err != nil {
    //         fmt.Println("Can't send")
    //         break
    //     }
	// }

	//subscribe to paint

	//send current state of paint

	//differentiate channels for incoming & outgoing messages

	//listen for events from socket or from paint

}