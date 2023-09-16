import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useNavigate, Link } from 'react-router-dom'
import "../styles/jobs.scss"
import Search from "../components/search.component"
import Sidebar from "../components/sidebar"
import NavBar from '../components/NavBar'
import Footer from '../components/footer.component'
import JobList from '../components/joblistcomponent'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { connect } from 'react-redux'
import { get_requests } from '../actions/omo'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import SearchResult from '../components/searchresult'

const Requests = ({ get_requests, isAuthenticated, isLoading, results, requests }) => {
    const navigate = useNavigate()
    const [searching, setSearching] = useState(false)
    const [filter, setFilter] = useState({
        department: "",
        model: "",
        ofApplied: false,
        salary: 1000,
        query: ""
    })
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (page) => {
    get_requests(page.selected +1)
    setCurrentPage(page.selected +1 )
    }
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
        get_requests(currentPage)
        if (!isAuthenticated) {
            return navigate('/login')
        }
    }, [])
    function handleChange(event) {
        const { name, value, type, checked} = event.target
        setFilter(prevFilter => ({...prevFilter, [name]: type === 'checkbox' ? checked : value}))
    }
    const handleSearch = (event) => {
        setSearching(true)
    }
    console.log(requests)
    return (
        <>
            <div className="jobs-container">
                <Helmet>
                    <title>Omo bank | Requests</title>
                    <link rel="icon" href={headIcon} />
                    <meta name="description" content="Omo bank recruitment site"  />
                </Helmet>
                <NavBar menuItems={[{name: "Home", link: "/home", onclick: ""},
                                    {name: "About", link: "/about", onclick: ""}, 
                                    {name: "FAQs", link: "/faqs", onclick: ""},
                                    {name: "Applications", link: "/applications", onclick: ""}
                                    ]} 
                />
                <div className="jobs-body">
                    <Sidebar className="sidebar"/>
                    <div className="jobs-main-content">
                        <Search handleChange={handleChange} filter={filter} searching={searching} handleSearch={handleSearch} />
                        {!searching ?
                        <>
                        <JobList texts={{type: 'requests', header: 'Publish requests', no_content: 'No publish requests for now'}} />
                        <div className='pag-req'>
                        {!isLoading ? <Link to="new"><button className='request-new-button'>Request new</button></Link> : <></>}
                        { requests && requests != '' ?
                        <div>
                            {requests.map(request=>{
                                return <div>{request.title}</div>
                            })}
                         <ReactPaginate
                            pageCount={Math.ceil(requests.length/ 5)}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination"}
                            pageClassName={"pagination-item"}
                            pageLinkClassName={"pagination-link"}
                            activeClassName={"active"}
                            previousClassName={"pagination-item"}
                            previousLinkClassName={"pagination-link"}
                            nextClassName={"pagination-item"}
                            nextLinkClassName={"pagination-link"}
                            disabledClassName={"disabled"}
                        /></div> : <></>
                        }
                        </div>
                        </> :
                        <>
                        <SearchResult type = { list[0] ? list[0].title ? 'job' : 'user' : 'job'} list = {list} />
                        </>
                        }
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    )
}
const mapStateToProps = state => ({
    requests: state.omo.requests,
    isLoading: state.omo.isLoading,
    results: state.omo.results,
    isAuthenticated: state.omo.isAuthenticated
})


export default connect(mapStateToProps, { get_requests })(Requests)