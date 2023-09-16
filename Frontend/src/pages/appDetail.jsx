import React, { useEffect, useState } from 'react'
import '../styles/jobdetail.scss'
import Sidebar from "../components/sidebar"
import NavBar from '../components/NavBar'
import Footer from '../components/footer.component'
import { Get_date, Get_date_time } from '../components/getdate'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { connect } from 'react-redux'
import { load_application, schedule_screening, shortlist_status } from '../actions/omo'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import DateTimePicker from 'react-datetime-picker'

const ApplicationDetail = ({ isAuthenticated, shortlist_status, user, load_application, schedule_screening, isLoading, application }) => {
    const params = useParams()
    const navigate = useNavigate()
    const [schedule, setSchedule] = useState(new Date())
    const [screening_type, setScreeningType] = useState("Interview")
    const [place, setPlace] = useState("")
    useEffect(() => {
        const id = params.id
        load_application(id)
        if (!isAuthenticated) {
            return navigate('/login')
        }
	    const usertype = user.user_type.split(' ').join('').toLowerCase()
	    const hruserbranch = user[usertype].branch
    	setPlace(hruserbranch)
    }, [])

    const changeHandler = event => {
    	setScreeningType(event.target.value)
    }
    const submitHandler = event => {
    	event.preventDefault()
    	schedule_screening(screening_type, schedule, place, application.id, user.hruser.id)
    }
	return (
        <>
            {application && !isLoading ?
            <div className="jobdetail-container">
                <Helmet>
                    <title>Omo bank | {application.job.title}</title>
                    <link rel="icon" href={headIcon} />
                    <meta name="description" content="Omo bank recruitment site"  />
                </Helmet>
                <NavBar menuItems={[{name: "Home", link: "/home", onclick: ""},
                                    {name: "About", link: "/about", onclick: ""}, 
                                    {name: "FAQs", link: "/faqs", onclick: ""},
                                    {name: "Applications", link: "/applications", onclick: ""}
                                    ]}
                />
                <div className="job-body">
                    <Sidebar className="sidebar" />
                    <div className="job-main-content">
                    	<div className='app-header'>
                    		<div className='pic-container'>
                    		<img src={application.user.recruit.photograph} alt='Applicant photo' />
                    		</div>
                    		<div className='header-text'>
                    			<h3>{`${application.user.first_name} ${application.user.middle_name} ${application.user.last_name}`}</h3>
                    			<h3>Applying for <Link to={`/jobs/${application.job.id}`} className='job-link'>
                    			{application.job.title}</Link> position</h3>
                    			<h3>Application status: {application.is_candidate ? 
                    			<span className='status'>Candidate</span> : application.is_shortlisted ? 
                    			<span className='status'>Shortlisted</span> : 
                    			<span className='status'>Application submitted</span>}</h3>
                    			<p className='date'>Application submitted on {Get_date_time(application.application_date)}</p>
                    		</div>
                    	</div>
                    	<div className='app-body'>
                    		<h2>Basic information</h2>
                    		<p>Name: <b>{`${application.user.first_name} ${application.user.middle_name} ${application.user.last_name}`}</b></p>
                    		<p>Email: <b>{application.user.email}</b></p>
                    		<p>phone number: <b>{application.user.phone}</b></p>
                    		<p>Address: <b>{application.user.recruit.region}</b></p>
                    		<h2>Files</h2>
                    		<p>ID: <a href={application.user.recruit.id_photo} target='_blank'> View</a></p>
                    		<p>Resume: <a href={application.user.recruit.resume} target='_blank'> View</a></p>
                    		<h2>Qualifications</h2>
                    		{application.user.qualification && application.user.qualification != '' ?
                    		<ul>{
                    		application.user.qualification.map((qualification, index) => 
                    			<li key={index}><b>Completed {qualification.qualification_type} {
                    			qualification.department != '' && qualification.department != '-' ? <>in </> : <></>}
                    			{qualification.department} with a CGPA of {qualification.grade}<> </>
                    			 at {qualification.institution}</b>
                    			 <ul>
                    			 <li>Start date: {qualification.start_date}</li>
                    			 <li>Date received: {qualification.date_received}</li>
                    			 <li>Transcript: <a href={qualification.transcript} target='_blank'> View</a></li>
                    			 <li>Certificate: <a href={qualification.certificate} target='_blank'> View</a></li>
                    			 </ul>
                    			 </li>
                    		)
                    		}</ul> : <b className='none'>None</b>}
                    		<h2>Experiences</h2>
                    		{	application.user.experience && application.user.experience != '' ?
                			<ul>
                			{application.user.experience.map((experience, index) => 
                				<li key={index}><b>Position: {experience.job_title}</b>
                				<ul>
                				<li>Employer: {experience.employer}</li>
                				<li>Job category: {experience.job_category}</li>
                				<li>Start date: {experience.start_date}</li>
                				<li>End date: {experience.end_date}</li>
                				<li>Experience letter: <a href={experience.experience_letter} target='_blank'> View</a></li>
                				</ul>
                				</li>
                			)}
                			</ul>
                    		: <b className='none'>None</b>
                    		}
                    	</div>
                    	{
                    		user.user_type.toLowerCase() === 'hr user' ?
                    		<div className='schedule-form'>
                    		{!application.is_shortlisted ?
                    			<button className='apply-button'
                    			onClick={() => shortlist_status(application.id, true)}
                    			>Shortlist</button> :
                    			<button className='apply-button'
                    			onClick={() => shortlist_status(application.id, false)}
                    			>Cross off</button>
                    		}
                    			<form className='schedule' onSubmit={submitHandler}>
                    				<DateTimePicker format="y-MM-dd h:mm:ss a" value={schedule} onChange={setSchedule} />
                    				<select className='screen-option' name='screening_type' value={screening_type} onChange={changeHandler}>
                    				<option value='Interview'>Interview</option>
                    				<option value='Test'>Test</option>
                    				</select>
                    				<button className='apply-button'>Schedule</button>
                    			</form>
                    		</div> : <></>
                    	}
                    </div>
                </div>
                <Footer />
            </div>
            : isLoading ? <AiOutlineLoading3Quarters className='jobdetail-loading' /> : navigate('/jobs') }
        </>
	)
}

const mapStateToProps = state => ({
    isAuthenticated: state.omo.isAuthenticated,
    user: state.omo.user,
    isLoading: state.omo.isLoading,
    application: state.omo.application
})

export default connect(mapStateToProps, { load_application, schedule_screening, shortlist_status })(ApplicationDetail)