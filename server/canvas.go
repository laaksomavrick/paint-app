package main

type Canvas struct {
	Id int
	Src string
}

func getInitialPaintState() []Canvas {

	canvases := make([]Canvas, 0)

	for i := 0; i < 128; i++ {
		canvas := Canvas{Id: i, Src: ""}
		canvases = append(canvases, canvas)
    }

	return canvases

}