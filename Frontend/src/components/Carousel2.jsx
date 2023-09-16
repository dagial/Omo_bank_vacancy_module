import React from 'react'
import sliderImg from '../files/slide2.png'

export default function Carousel2() {
	return (
		<div className="slider fade">
			<div className="text-container">
                <div className="text-header">Get Discovered</div>
                <div className="text">
                	<p>Attach your qualification and
					experiences to get notified when
					a vacancy is open</p>
                </div>
            </div>
            <img src={sliderImg} alt="Join us illustration"/>
		</div>
	)
}