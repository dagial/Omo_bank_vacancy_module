import "./radio.style.scss"

const Radio=({choices,label_name,value,...otherProps})=>{
   
    return(

        <div className="input-flex">
            <div className="all-input-labels">{label_name}</div>
            <div className="radio-buttons-container">
            {choices.map((item)=>{
                return (
                    <div key={item} className="radio-button">
                    <input type="radio" id="rad" value={item} className="radio-button" {...otherProps} checked={item==value}/>
                    <label htmlFor="rad">{item}</label>
                    </div>
                )
            })}
            
          
            

            </div>
       
            
        </div>

    )
}

export default Radio;