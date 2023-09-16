import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "../styles/calendar.scss"
import Search from "../components/search.component"
import Sidebar from "../components/sidebar"
import NavBar from '../components/NavBar'
import Footer from '../components/footer.component'
import JobList from '../components/joblistcomponent'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { connect } from 'react-redux'
import { get_events } from '../actions/omo'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Get_time } from '../components/getdate'

const UserCalendar = ({ isAuthenticated, isLoading, get_events, events, user }) => {
    const navigate = useNavigate()
    const [date, setDate] = useState()
    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/login')
        }
    }, [])
    useEffect(() => {
        get_events(date)
    }, [date])
    return (
        <>
            <div className="calendar-container">
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
                <div className="calendar-body">
                    <Sidebar className="sidebar"/>
                    <div className="calendar-main-content">
                    <div className='calendar-box'>
						<Calendar className='calendar' onChange={setDate} value={date} />
                        { events && events != '' ?
                        events.map((event, index) => 
                            <div key={index} className='event-container'>
                                <li>At <b>{Get_time(event.schedule)}</b>, <b>{event.screening_type}</b> {user.user_type.toLowerCase() === 'recruit' ?  <></> : <>with<> </>
                                <Link className='link' to={`/applications/${event.application.id}`}><b>{event.application.user.first_name} 
                               <> </>{event.application.user.middle_name}</b></Link></>}<> </> for<> </>
                               <Link className='link' to={`/jobs/${event.application.job.id}`}><b>{event.application.job.title}</b></Link> position.</li>
                            </div>
                        )
                        : date ? <b>No events for selected day</b> : <></>
                        }
                    </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    )
}
const mapStateToProps = state => ({
    isLoading: state.omo.isLoading,
    events: state.omo.events,
    user: state.omo.user,
    isAuthenticated: state.omo.isAuthenticated
})


export default connect(mapStateToProps, { get_events })(UserCalendar)