import "./skeleton.style.scss"
import SmallNav from "../../components/SmallNav"
import Footer from "../../components/footer.component"
import {Outlet} from "react-router-dom"

const Skeleton=()=>{
    return (
        <div className="skeleton-container">
            <div >
            <SmallNav/>
            </div>
            <div className="skeleton-content">
                <Outlet/>
            </div>
          <div className="skeleton-footer"> <Footer/></div> 
        </div>
    )
}
export default Skeleton;