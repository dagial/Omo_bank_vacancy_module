import { useState, useEffect } from 'react'
import "../styles/recruithome.scss"
import Search from "../components/search.component"
import Display from "../components/display.component"
import Sidebar from "../components/sidebar"
import NavBar from '../components/NavBar'
import VacantTable from "../components/vaccant-table.component"
import Footer from '../components/footer.component'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { connect } from 'react-redux'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import SearchResult from '../components/searchresult'
import { display_boxes } from '../actions/omo'

const RecruitHome=({ isAuthenticated, results, isLoading, display_boxes, display, user }) => {
    const navigate = useNavigate()
    const [searching, setSearching] = useState(false)
    const [filter, setFilter] = useState({
        department: "",
        model: "",
        ofApplied: false,
        salary: 1000,
        query: ""
    })
    const [list, setList] = useState([])
    const searchItems = results
    useEffect(()=>{ 
        if (searchItems) {
            const filteredSearch=searchItems.filter((item,index)=>{
                if (item.job){
                    if(parseInt(item.job.salary)>=filter.salary){
                        if(filter.department){
                            if( item.job.department.toLowerCase()==filter.department.toLowerCase()){
                            return item
                            }
                        }
                        else{
                            return item
                        }
                    }
                }
                else if (item.title){
                    if(parseInt(item.salary)>=filter.salary){
                        if(filter.department){
                            if(item.department.toLowerCase()==filter.department.toLowerCase()){
                                return item
                            }
                        }
                        else{
                            return item
                        }
                    }
                }
            })
            setList(filteredSearch)
        }
    },[filter, searchItems])
    useEffect(() => {
        if (user) {
            console.log(user)
            let temp = user.user_type.split(" ").join("").toLowerCase()
            console.log(temp)
            // if(!user[temp]) {
            //     navigate('/settings')
            // }
        }
        display_boxes()
        if (!isAuthenticated) {
            return navigate('/login')
        }
    }, [user])
    function handleChange(event) {
        const { name, value, type, checked} = event.target
        setFilter(prevFilter => ({...prevFilter, [name]: type === 'checkbox' ? checked : value}))
    }
    const handleSearch = (event) => {
        setSearching(true)
    }
    return (
        <>
        
            <div className="recruiter-home-container">
                <Helmet>
                    <title>Omo bank | Home</title>
                    <link rel="icon" href={headIcon} />
                    <meta name="description" content="Omo bank recruitment site"  />
                </Helmet>
                <NavBar menuItems={[{name: "Home", link: "/home", onclick: ""},
                                    {name: "About", link: "/about", onclick: ""}, 
                                    {name: "FAQs", link: "/faqs", onclick: ""},
                                    {name: "Applications", link: "/applications", onclick: ""}
                                    ]} 
                />
                <div className="home-body">
                    <Sidebar/>
                    <div className="recruiter-main-content">
                        <Search handleChange={handleChange} filter={filter} searching={searching} handleSearch={handleSearch} />
                        {!searching ?
                        <div>
                        <div className="recruiter-display">
                            { display ?
                            Object.keys(display).map((key, index) => 
                                <div className="display-items" key={index}><Display name={key} value={display[key][key]} link={display[key].link} /></div>) :
                            isLoading ? <AiOutlineLoading3Quarters className='app-loading' /> : <></>
                            }
                        </div>
                        <VacantTable/>
                        </div> : 
                        <> 
                            <SearchResult type = { list[0] ? list[0].title ? 'job' : 'user' : 'job'} list = {list} />
                        </>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.omo.isAuthenticated,
    user: state.omo.user,
    results: state.omo.results,
    display: state.omo.display,
    isLoading: state.omo.isLoading
})

export default connect(mapStateToProps, { display_boxes })(RecruitHome)