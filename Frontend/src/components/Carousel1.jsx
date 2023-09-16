import React from 'react'
import {Link} from 'react-router-dom'
import sliderImg from '../files/slide1.png'

export default function Carousel1() {
	return (
		<div className="slider fade">
			<div className="text-container">
                <div className="text-header">Join us</div>
                <div className="text">
                	<p>Look for vacancies in our company and pursue a carrer with us</p>
                	<Link to="/register"><button className="get-started-button">Get Started</button></Link>
                </div>
            </div>
            <img src={sliderImg} alt="Join us illustration"/>
		</div>
	)
}