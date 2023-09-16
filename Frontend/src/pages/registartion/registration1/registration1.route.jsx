import "./registration1.style.scss"
import Common from "../../../components/commonInputList/common.component"

const Registration1=()=>{
    const testing={"Dage":'',"dkja":'',"kd;l":''}
    return(
        <Common Obj={testing} ButtonName="Register" />
    )
}

export default Registration1;