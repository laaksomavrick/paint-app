package main

type Event struct {
	Type      string // "join", "leave" or "update"
	//User      string
	Timestamp int    // Unix timestamp (secs)
	Data      string // What the user said (if Type == "update")
}

type Subscription struct {
	Archive []Event
}

var (
	// Send a channel here to get room events back.  It will send the entire
	// archive initially, and then new messages as they come in.
	subscribe = make(chan (chan<- Subscription), 10)
	// Send a channel here to unsubscribe.
	unsubscribe = make(chan (<-chan Event), 10)
	// Send events here to publish them.
	publish = make(chan Event, 10)
)

func Subscribe() Subscription {
	resp := make(chan Subscription)
	subscribe <- resp
	return <-resp
}

func paint() {


}