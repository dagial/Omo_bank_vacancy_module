import React, { useEffect } from 'react'
import '../styles/jobdetail.scss'
import Sidebar from "../components/sidebar"
import NavBar from '../components/NavBar'
import Footer from '../components/footer.component'
import { Get_date, Get_date_time } from '../components/getdate'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { connect } from 'react-redux'
import { load_job, censor, apply } from '../actions/omo'
import { useNavigate, useParams } from 'react-router-dom'
import { MdLocationPin } from 'react-icons/md'
import { BsPersonFill } from 'react-icons/bs'
import { BiHide } from 'react-icons/bi'
import { FcDepartment } from 'react-icons/fc'
import { GiTwoCoins } from 'react-icons/gi'
import { AiOutlineLoading3Quarters, AiFillDelete } from 'react-icons/ai'
import { FaClipboardList, FaTh, FaRegCalendarAlt } from 'react-icons/fa'

const JobDetail = ({ isAuthenticated, user, load_job, isLoading, job, censor, apply }) => {
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const id = params.id
        load_job(id)
        if (!isAuthenticated) {
            return navigate('/login')
        }
    }, [])

    function sub_application() {
        if (user.recruit) {
            apply(user.id, job.id)
            alert('Application submitted')
        } else {
            alert('Please go to settings and set up your account to be able to apply for jobs.')
        }
    }

	return (
        <>
            {job ?
            <div className="jobdetail-container">
                <Helmet>
                    <title>Omo bank | {job.title}</title>
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
                    	<div className='title-date'>
							<h1>{job.title}</h1>
							<p>Posted on {Get_date_time(job.date_created)}</p>
						</div>
						<div className='short-details'>
							<h2>Job details</h2>
							<div className='detail-box'>
                                <div className='left-items'>
                                    <div className='left--item'>
                                        <MdLocationPin className='icon' />
                                        <p><a href={`https://www.google.com/maps/search/${job.branch}`} target='_blank'>{job.branch}</a></p>
                                    </div>
                                    <div className='left--item'>
                                        <GiTwoCoins className='coins' />
                                        <p>{job.salary} Br/month</p>
                                    </div>
                                    <div className='left--item'>
                                        <FaClipboardList className='icon' />
                                        <p>{job.employment_type} Employment</p>
                                    </div>
                                </div>
                                <div className='right-items'>
                                    <div className='right--item'>
                                        <BsPersonFill className='icon' />
                                        <p>{job.vacant > 1 ? `${job.vacant} Vacancies` : `${job.vacant} Vacancy`}</p>
                                    </div>
                                    <div className='right--item'>
                                        <FaRegCalendarAlt className='icon' />
                                        <p>Closes on {Get_date(job.deadline)}</p>
                                    </div>
                                    <div className='right--item'>
                                        <FcDepartment className='icon' />
                                        <p>{job.department} Department</p>
                                    </div>
                                </div>
							</div>
						</div>
                        <div className='full-detail'>
                            <article>
                                <h2>Overview</h2>
                                <h3>Position Title</h3>
                                <p>{job.title}</p>
                                <h3>Workunit</h3>
                                <p>{job.work_unit}</p>
                                <h3>Description</h3>
                                <p>{job.description}</p>
                                <h2>Requirements</h2>
                                <h3>Education</h3>
                                {
                                    job.educational_requirement.map((requirement, index) => 
                                        <p key={index}>{requirement.qualification_type}{requirement.qualification_department != '-' ?
                                        <> in {requirement.qualification_department}</> : <></>}
                                        {requirement.minimum_grade_required != 0 ? <> with a minimum grade of {requirement.minimum_grade_required}</> : <></>}
                                        </p>
                                    )
                                }
                                
                                <h3>Experience</h3>
                                <p>A minimum of {job.experience_required}{job.experience_required ? `/${job.experience_required+2} ` : <> </>} 
                                years of relevant work experience is 
                                required to be eligible for this position.</p>
                                <div className='inline'><h3>Gender : </h3><p>{job.gender_required}</p></div>
                                <h2>Salary</h2>
                                <div className='inline'><h3>Grade :</h3><p>{job.grade}</p></div>
                                <div className='inline'><h3>Amount :</h3><p>{job.salary} Br/month</p></div>
                            </article>
                        </div>
                        {user ? user.user_type === 'RECRUIT' ? <button className='apply-button' onClick={sub_application}>Apply</button> : <></> : <></>}
                        {user ? user.user_type === 'HR USER' ? 
                        <div className='hr-buttons' style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                className='apply-button' 
                                onClick={() => {
                                    censor(job.id, false)
                                    navigate('/home')
                                }}>
                                <BiHide /> Censor
                            </button>
                            <button 
                                className='apply-button'>
                                <AiFillDelete /> Delete
                            </button>
                        </div> : <></> : <></>}
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
    job: state.omo.job
})

export default connect(mapStateToProps, { load_job, censor, apply })(JobDetail)