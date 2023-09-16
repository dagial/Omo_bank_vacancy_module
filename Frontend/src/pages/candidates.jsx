import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "../styles/apps.scss"
import Search from "../components/search.component"
import Sidebar from "../components/sidebar"
import NavBar from '../components/NavBar'
import Footer from '../components/footer.component'
import ApplicationList from '../components/applicationlist'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { connect } from 'react-redux'
import { get_applications } from '../actions/omo'
import SearchResult from '../components/searchresult'

const Candidates = ({ get_applications, isAuthenticated, isLoading, results }) => {
    const navigate = useNavigate()
    const [searching, setSearching] = useState(false)
    const [filter, setFilter] = useState({
        department: "",
        model: "Candidate",
        ofApplied: false,
        salary: 1000,
        query: ""
    })
    const [type, setType] = useState("Candidate")
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
        if (!isAuthenticated) {
            return navigate('/login')
        }
        get_applications(type)
    }, [type])
    function handleToggle() {
        setType('Shortlist')
    }
    function back() {
        setType('Candidate')
    }
    function handleChange(event) {
        const { name, value, type, checked} = event.target
        setFilter(prevFilter => ({...prevFilter, [name]: type === 'checkbox' ? checked : value}))
    }
    const handleSearch = (event) => {
        setSearching(true)
    }
    return (
        <>
            <div className="apps-container">
                <Helmet>
                    <title>Omo bank | Applications</title>
                    <link rel="icon" href={headIcon} />
                    <meta name="description" content="Omo bank recruitment site"  />
                </Helmet>
                <NavBar menuItems={[{name: "Home", link: "/home", onclick: ""},
                                    {name: "About", link: "/about", onclick: ""}, 
                                    {name: "FAQs", link: "/faqs", onclick: ""},
                                    {name: "Applications", link: "/applications", onclick: ""}
                                    ]} 
                />
                <div className="apps-body">
                    <Sidebar className="sidebar"/>
                    <div className="apps-main-content">
                        <Search 
                        handleChange={handleChange} 
                        filter={filter} 
                        searching={searching} 
                        handleSearch={handleSearch} />
                        {!searching ? <>
                        <ApplicationList no_content={type==='Candidate' ? "No candidates" : "None shortlisted"} header={type === 'Candidate' ? "Candidates" : "Shortlisted"} />
                        {type === 'Candidate' ?
                         <button className='toggle-button' onClick={handleToggle}>Shortlisted</button> :
                         <button className='toggle-button' onClick={back}>Candidates</button> }
                        </>:
                        <SearchResult type = { list[0] ? list[0].title ? 'job' : 'user' : 'job'} list = {list} />
                        }
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    )
}
const mapStateToProps = state => ({
    isLoading: state.omo.isLoading,
    results: state.omo.results,
    isAuthenticated: state.omo.isAuthenticated
})


export default connect(mapStateToProps, { get_applications })(Candidates)