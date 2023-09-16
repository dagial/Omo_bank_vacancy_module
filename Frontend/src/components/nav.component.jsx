import omoLogo from "../files/omo_bank_logo.jpg"
import "../styles/nav.style.scss"
import SmallNav from "./SmallNav"

const Nav=()=>{
    const visitor=true;
    return(

        <div className="nav-container">
            <SmallNav />
            <div className="logo">
                <div className="ab-logo"> የሁላችንም ባንክ</div>
                <img src={omoLogo} className="nav-logo" alt="Omo Logo"/>
            </div>
            <SmallNav />
            <div className="main-nav-container">
                <ul className="main-nav-list">
                    <li className="nav-list-item"><a href="">Home</a></li>
                    <li className="nav-list-item"><a href="">About</a></li>
                    {
                    visitor?
                    <>
                    <li className="nav-list-item"><a href="">FAQ</a></li>
                    <li className="nav-list-item"><a href="">Jobs</a></li>
                    <li className="nav-list-item"><a href="">Register</a></li>
                    <li className="nav-list-item"><a href="">Login</a></li>
                    </>:
                    <>
                    <li className="nav-list-item"><a href="">Applications</a></li>
                    <li className="nav-list-item"><a href="">Vacancies</a></li>
                    <li className="nav-list-item"><a href="">Logout</a></li>
                    </>
}
                </ul>
            </div>

        </div>
    )
}
export default Nav;