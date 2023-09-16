import "./inputText.style.scss"

const InputText=({type,inputTextHandler,value,inputType,name})=>{

    return(
        <div className="input-text-container">
             <label htmlFor="">{name}</label>
            <input type={type} placeholder={name} name={name} className={inputType} onChange={inputTextHandler} value={value} />
        </div>
    )
}
export default InputText;