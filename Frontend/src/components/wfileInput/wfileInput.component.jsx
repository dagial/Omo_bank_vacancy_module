import "./wfileInput.style.scss"
import FileInput from "../fileInput/fileInput.component"

const WFileInput=({type,label_name,value,...otherProps})=>{

    return(
        <div className={`input-${type}`}>
            <div className="all-input-labels w-fileInput-label">{label_name}</div>
            <div className="w-fileInut">
            <FileInput {...otherProps}/>
            </div>
        </div>
        )
}

export default WFileInput;