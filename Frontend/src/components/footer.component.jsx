import "../styles/footer.style.scss"
const Footer=()=>{

    return(
        <div className="footer-container" id="footer">
            <ul className="nav-small-list">
                <li className="nav-small-items"><a href="">Contact Us</a></li>
                <li className="nav-small-items"><a href="">OMO-BANK-Managment</a></li>
                <li className="nav-small-items"><a href="">Branches</a></li>
                <li className="nav-small-items"><a href="">Downloads</a></li>
                <li className="nav-small-items"><a href="">Bids</a></li>
                <li className="nav-small-items"><a href="">News</a></li>
                <li className="nav-small-items"><a href="">Media</a></li>
                <li className="nav-small-items"><a href="">FAQ</a></li>
            </ul>
            <div className="copyRights">
                © Copyrights {new Date().getFullYear()} &nbsp;<span className="footer-owner">  OMO Bank</span>
            </div>
        </div>
    )
}
export default Footer;