import "./registration-skeleton.style.scss"
import omoLogo from "../../files/omo_bank_logo.jpg"
import { Outlet } from "react-router-dom"
import {useState} from "react"

const RegiSkeleton=()=>{
    const [skeletonHeader,setSkeletonHeader]= useState()
    return(
        <div className="regi-sekeleton">
        <div className="regi-skeleton-container">
            <img src={omoLogo} alt='omo logo' className="regi-skeleton-logo"/>
            <div className="regi-skeleton-header">
            {skeletonHeader}
            </div>
            
        </div>
        <div><Outlet context={[setSkeletonHeader]}/></div>
        </div>
    )
}
export default RegiSkeleton;