import React from 'react'
import {ImFacebook} from "react-icons/im"
import {GoMail} from "react-icons/go"
import {FaPhoneAlt} from "react-icons/fa"
import {BsPlayBtn} from "react-icons/bs"
import "../styles/smallnav.scss"

export default function SmallNav() {
    return (
        <div className="small-nav-container">
                <ul className="nav-small-list">
                    <li className="nav-small-items"><a href="">Contact Us</a></li>
                    <li className="nav-small-items"><a href="">OMO-BANK-Managment</a></li>
                    <li className="nav-small-items"><a href="">Branches</a></li>
                    <li className="nav-small-items"><a href="">Downloads</a></li>
                    <li className="nav-small-items"><a href="">Bids</a></li>
                    <li className="nav-small-items"><a href="">News</a></li>
                    <li className="nav-small-items"><a href="">Media</a></li>
                    <li className="nav-small-items"><a href="">FAQ</a></li>
                    <abbr title='Follow us'><ImFacebook className="nav-icon"/></abbr>
                    <abbr title='Email us'><GoMail className="nav-icon"/></abbr>
                    <abbr title='Call us'><FaPhoneAlt className="nav-icon"/></abbr>
                    <abbr title='Watch us on YouTube'><BsPlayBtn className="nav-icon"/></abbr>
                </ul>
            </div>
    )
}