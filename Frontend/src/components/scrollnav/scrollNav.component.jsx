import omoLogo from "../../files/omo_bank_logo.jpg"
import "./scrollNav.style.scss"
import { Link } from 'react-router-dom'

const ScrollNav=(props)=>{
    const visitor=true
    return(
        <div className="nav-container-scroll">
            <div className="logo">
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

        </div>
    )
}
export default ScrollNav