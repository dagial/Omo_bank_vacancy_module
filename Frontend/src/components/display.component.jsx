import { Link } from 'react-router-dom'
import "../styles/display.style.scss"

const Display=(props)=>{
    const { name, value, link } = props
    return(
        <Link to={`${link}`} className='displaylink'>
            <div className="display-container">
                <div className="display-number">{value}</div>
                <div className="display-letter">{name}</div>
            </div>
        </Link>
    )
}
export default Display;