import Nav from "../../components/nav/nav.component";
import Footer from "../../components/footer/footer.component";
import { Outlet } from "react-router-dom";
import "./navigation.style.scss"
const Navigation=()=>{

    return(
        <div className="navigation-container">
            <div className="navigation-nav">
            <Nav/>
            </div>
            <Outlet/>
            <div className="navigation-footer">
            <Footer/>
            </div>
            
        </div>
    )
}
export default Navigation;