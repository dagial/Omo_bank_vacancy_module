import "./select.style.scss"
import {TfiAngleDown} from "react-icons/tfi"
import {useState,useEffect} from 'react'
// import { capitalize } from "../../utils"

const types={
  file_types:["audio","file","picture","text","video"],
  status_types:['approved',"disapproved","active","inactive"]

}

const SelectInput=({selected,selected_array,default_name,label_name,...otherProps})=>{
   
      const [toggleSelect,setToggleSelect]=useState(false)
      const {name}=otherProps
      
     
      const clickHandler=()=>{
        setToggleSelect(!toggleSelect)
      }
      
    return(
        <div className="input-flex">
          <select name={name} required>
           {
            selected_array.map((item,index)=>{
              
              return <option key={index} selected={item===selected} value={item}>{item}</option>
            })
           } 
          </select>
          <div className="all-input-labels">
            {label_name}
          </div>
        <div className="select">
            <div onClick={clickHandler} className='selected-container'>
            
            <span className='selected'>{selected ?selected: default_name}</span><TfiAngleDown className={`${toggleSelect?'select-icon-reverse':''} select-icon`}/>
            </div>
            
            <div className="selectables-container">
            {toggleSelect && selected_array.map((selectable,i)=>{
                return (
                <div className='selectable-container' key={i} >
                <input type='radio' className="radio-button" onClick={clickHandler} {...otherProps} value={selectable} id={selectable} required/>
                <label htmlFor={selectable} >{selectable}</label>
                </div>)
            })}
            </div>
            </div>
            </div>

    )
}
export default SelectInput