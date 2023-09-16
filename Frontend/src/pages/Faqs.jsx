import React ,{useState} from 'react'
import '../styles/Faq.css'
export default function Faqs() {
  
 
  const [open,setOpen] = useState(null)
  
  const handleclick =(i)=>{   
        if ( open === i){
          setOpen(null)
        }else{
           setOpen(i)
        }
       
  }


  const data = [
    {
      id:1,
    question:"Do I have to complete all of the information in each of the sections?",
    answer:"All fields marked with an asterisk (*) are required information and must be completed for each section.",
    },
     {
       id:2,
       question:"What should I do if my relevant information is not included in one of the drop-down options?",
       answer:"You will be required to choose from the available drop-down options. Please choose the option that is the closest to your personal information, skills and experience.",
      },
     {
       id:3,
       question:" Can I apply to a job posting even if I do not meet the minimum requirements?",
       answer:"You will not be able to apply to a job posting if your relevant education, work  experience, language skills and possible other qualifications do not meet the minimum requirements specified in the job posting.",
     },
     {
       id:4,
       question:"After I submit my application, will I receive a confirmation?",
       answer:"After you have submitted your application online, you will receive an automated email confirming receipt of your application",
     },
     {
       id:5,
       question:"I'm having a problem which is not described above how can you help me?",
       answer:"Don't hesitate to contact us at omoBank31@gmail.com with any issues you have. Please attach a screenshot and provide detailed information about an issue, hence this will help us to resolve your problem quickly.",
     },
  ]

  return (
    <div className='container'>
       
       <div className="contb">
        <h2>Frequently Asked Questions</h2>
        {data.map((item,i)=>(
           <div>
            
              <div className="drop">
                 <h3 >{item.question}</h3>
                 <h3 onClick={()=>handleclick(i)}>{open === i ? "-" : "+"}</h3>
               </div>
               {
                open === i ? 
                  <p>{item.answer}</p>  
                 : null
               }
                
          </div>
        ))}   
       </div> 
   </div>
      )
    
}
     