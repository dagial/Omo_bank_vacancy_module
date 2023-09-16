import "./buttonEdge.style.scss"
import {TfiAngleRight,TfiAngleLeft} from "react-icons/tfi"

const Button=({buttonType,Text,angle,clickHandler,type,...otherProps})=>{
    return (
        <button type={type || "button" }className={buttonType} onClick={clickHandler} {...otherProps}>{angle=="prev" && <TfiAngleLeft/>}{Text}{angle=="next" && <TfiAngleRight/>}</button>
    )
}
export default Button;