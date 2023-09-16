import "./addDisplay.style.scss"
import {useLocation} from "react-router-dom"
import {TbEdit} from "react-icons/tb"
import {AiOutlineDelete} from "react-icons/ai"

const AddDisplay=({item ,index,editDisplay,editable,displayDeleteHandler,displayDelete,...otherProps})=>{
    
    const location=useLocation();
    const {pathname}=location

    const check=()=>{
        if(editable){
            return <div  id="edit">edited fields</div>
        }
        else{
            return <TbEdit id="edit" onClick={e=>editDisplay(e,index)}/>

        }
    }
    return(
        <div className="addDisplay-container">
         
            <table>
               {<tr className="addDisplay-row">
                {Object.keys(item).map((keys,index)=>{
                    return <th className="addDisplay-colum" key={index}>{keys}</th>
                })}
                </tr>}
                <tr className="addDisplay-row">
                    {Object.values(item).map((value,index)=>{
                        return <th className="addDisplay-colum" key={index}>{typeof value=="object"? value.name:value}</th>
                    })}
                    
                    <th className="addDisplay-delete" {...otherProps}>
                        <div>
                            {
                                
                                pathname=="/registration"? <></>:check()
                               
                            }
                         {displayDelete && <AiOutlineDelete  id="delete" onClick={displayDeleteHandler} />}
                            </div>
                            </th>
                </tr>
            </table>
        </div>
    )
}

export default AddDisplay;