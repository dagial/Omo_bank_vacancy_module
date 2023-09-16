import "./input2.style.scss"

const TextInput2=({label_name,...otherProps})=>{

    return(
        <div className="input-flex TextInput2-container">
            <label htmlFor="" className="all-input-labels">{label_name}</label>
            <div className="TextInput2-input">
            <input placeholder={label_name} {...otherProps}/></div>
        </div>
    )
}

export default TextInput2;