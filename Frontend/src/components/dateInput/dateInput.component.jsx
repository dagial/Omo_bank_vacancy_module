import "./dateInput.style.scss"

const DateInput=({label_name,...otherProps})=>{

    
    return(
        <div className="input-flex">
            <label className="all-input-labels">{label_name}</label>
            <input type="date" className="date-input" {...otherProps} />
        </div>
    )
}
export default DateInput;