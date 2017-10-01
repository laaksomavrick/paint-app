package main

type Canvas struct {
	id int
	src string
}

func getInitialPaintState() []Canvas {

	canvases := make([]Canvas, 0)

	for i := 0; i < 128; i++ {
		canvas := Canvas{id: i, src: ""}
		canvases = append(canvases, canvas)
    }

	return canvases

}