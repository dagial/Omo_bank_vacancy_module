import "./fileInput.style.scss"
import { useLocation, useParams } from "react-router-dom"


const FileInput=({val,...otherProps})=>{
    const nullHandler=()=>{

    }
    const {pathname}=useLocation()
    const params = useParams()
    const id = params.id
    console.log(`registration/edit/${id}`)
    console.log(pathname)
    return(
        <div className="file-input-container">
        {pathname==`/registration/edit/${id}` && val &&<div className="detail-file-link">
            <a href={val}>File</a>
        </div>}
       <input type="text" id="file-input-name" value={val} onChange={nullHandler} placeholder="No file selected" required />
       
        <label className="file-input-label">
        <input type="file"  {...otherProps} />
        Browse
        </label>
        </div>
        )
}

export default FileInput;