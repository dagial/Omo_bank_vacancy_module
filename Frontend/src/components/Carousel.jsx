import React from 'react'
import Carousel1 from './Carousel1'
import Carousel2 from './Carousel2'
import Carousel3 from './Carousel3'
import '../styles/carousel.scss'

export default function Carousel() {
	const [slider, setSlider] = React.useState(1)

	function SlidePicker() {
		switch(slider) {
			case 0:
				return <Carousel3 />
			case 1: 
				return <Carousel1 />
			case 2: 
				return <Carousel2 />
			case 3: 
				return <Carousel3 />
			case 4:
				return <Carousel1 />
			default:
				return
		}
	}

	React.useEffect(() => {
		if (slider === 0) {setSlider(3)}
		if (slider === 4) {setSlider(1)}
	}, [slider])

	function PlusSlides(n) {
		setSlider(prevSlider => prevSlider + n)
	}

	function CurrentSlide(n) {
		setSlider(n)
	}
	return (
		<>
			<div className="slideshow-container">
				{SlidePicker()}
				<a className="prev" onClick={() => PlusSlides(-1)}>&#10094;</a>
				<a className="next" onClick={() => PlusSlides(1)}>&#10095;</a>
			</div>

			<br />
			<div className="dots">
				<span className="dot" onClick={() => CurrentSlide(1)}></span>
				<span className="dot" onClick={() => CurrentSlide(2)}></span>
				<span className="dot" onClick={() => CurrentSlide(3)}></span>
			</div>
		</>
	)
}