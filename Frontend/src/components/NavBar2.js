import React from 'react';
import logo from '../files/omo_bank_logo.jpg';
import '../styles/navbar.css'

export default function NavBar(Navitems) {
	let items = Navitems.Navitem.map(item => <li key={item}>{item}</li>)
	return (
		<>
			<nav className="navbar">
				<img src={logo} alt="logo" />
				<ul className="nav-items">
					{items}
				</ul>
			</nav>
		</>
	)
}
