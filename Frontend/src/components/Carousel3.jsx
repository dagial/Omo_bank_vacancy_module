import React from 'react'
import sliderImg from '../files/slide3.png'

export default function Carousel3() {
	return (
		<div className="slider fade">
			<div className="text-container">
                <div className="text-header slid">Meet for Interview</div>
                <div className="text">
                	<p>Go through the whole
					application process online and
					drop by for scheduled interview</p>
                </div>
            </div>
            <img className="slPic" src={sliderImg} alt="Join us illustration"/>
		</div>
	)
}