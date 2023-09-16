import omoLogo from "../../files/omo_bank_logo.jpg"
import Button from "../Button/button.component"
import InputText from "../inputText/input1/inputText.component"
import "./common.style.scss"
const Common=({Obj,onChangeHandler,ButtonName})=>{

    return(
        <div className="common-container">
    <div className="common-content">
    <img src={omoLogo} alt="omoLogo" className="common-image"/>
    <div className="common-input-container">
       {Object.keys(Obj).map((k,index)=>{

        return (
        <div  key={index} className="common-input-items">
        <InputText name={k} type={k} inputType="input1" inputTextHandler={onChangeHandler} Value={Obj[k]}/>
        </div>
        )

       })}
       {/* <div className="common-input-items"> 
       <InputText name="Password" type="password" inputType="input1"/>
       </div> */}
    </div>
    <div className="common-button-container">
        <Button Text={ButtonName} buttonType="button-radius"/>
    </div>
    <div className="common-text-container">
        <div>Don't have an account <a href="#">Register here</a></div>
        <div><a href="#">Forgot password?</a></div>
    </div>
    </div>
</div>
    )
}
export default Common;