import TextInput2 from "../components/inputText/input2/input2.component"
import WFileInput from "../components/wfileInput/wfileInput.component"
import DateInput from "../components/dateInput/dateInput.component"
import Radio from "../components/radio/radio.component"
import SelectInput from "../components/select-input/select.component"


export const mapper=({mapper_type,...otherProps})=>{

    switch(mapper_type){
        case "text":
            return <TextInput2 {...otherProps}/>
        case "file":
            return <WFileInput {...otherProps}/>
        case "date":
            return <DateInput {...otherProps}/>
        case "radio":
            return <Radio {...otherProps}/>
        case "select":
            return <SelectInput {...otherProps}/>
        default:
            return

    }


}

const mapToFormData=(data)=>{
    const form=new FormData()
    data.forEach((item,index)=>{
        item.forEach((item1,index1)=>{
            Object.keys(item1).forEach((item2,index2)=>{
                if(typeof item1[item2]=="object"){
                    form.append(`${item2}-${index1}`,item1[item2],item1[item2].name)
                }
                else{
                    form.append(`${item2}-${index1}`,item1[item2])
                }
            })
        })

    })
    
}