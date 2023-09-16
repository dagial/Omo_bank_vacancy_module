import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import omoLogo from "../files/omo_bank_logo.jpg"
import "../styles/nav.style.scss"
import SmallNav from "./SmallNav"
import ScrollNav from './scrollnav/scrollNav.component'
import { connect } from 'react-redux'
import { logout } from '../actions/omo'

function NavBar(props) {
    const [scrolled,setScrolled]=useState(true)
    const targetRef=useRef(null);
    const options=useMemo(()=>{
        return {
            root:null,
            threshold:0,
        }
    })
   
    useEffect(()=>{
        const header=targetRef.current;
        const headerObserver=new IntersectionObserver((entries,headerObserver)=>{
        entries.forEach(entry=>{
            setScrolled(entry.isIntersecting)
        })
        },options)
    if (header)
        headerObserver.observe(header)
    }, [ targetRef,options])
    return(
        <div ref={targetRef} className='both-navs'>
            {scrolled ?
            <div className="nav-container">
                <div className="smallnav"><SmallNav /></div>
                <div className="logo">
                    <div className="ab-logo">የሁላችንም ባንክ</div>
                    <img src={omoLogo} className="nav-logo" alt="Omo Logo"/>
                </div>
                <div className="main-nav-container">
                    <ul className="main-nav-list">
                        {props.menuItems.map(item => <li className="nav-list-item" key={item.name}>
                            <Link to={item.link} onClick={item.onclick}>{item.name}</Link>
                            </li>)}
                        {props.isAuthenticated ? <li className="nav-list-item"><a href="" onClick={props.logout}>Logout</a></li> : <li></li>}
                    </ul>
                </div>
            </div> :
            <ScrollNav menuItems={props.menuItems} isAuthenticated={props.isAuthenticated} />}
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.omo.isAuthenticated
})

export default connect(mapStateToProps, { logout })(NavBar)