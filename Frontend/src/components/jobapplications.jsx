import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Get_date_time, Check_deadline } from './getdate'
import '../styles/joblist.scss'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function JobApplications(props) {
	const { applications, isLoading } = props
	return (
		<>
		{ applications && applications != null && applications != "" ?
			<>
			<h1>Applications</h1>
			{
			applications.map(application => 
				<div className='job-container' key={application.job.id}>
					<Link to={`/jobs/${application.job.id}`} className='linktojob'>
						<div className='job-header'>
							<div className='img-title'>
								<img src={application.job.icon} alt='dep' />
								<div className='title-date'>
									<h2>{application.job.title}</h2>
									<p>Posted on {Get_date_time(application.job.date_created)}</p>
								</div>
							</div>
							<div className='vacants'>
								<p>{application.is_shortlisted ? <>Shortlisted</> : application.is_candidate ? <>Candidate</> : <>Application Submitted</>}</p>
							</div>
						</div>
						<div className='description'>
							<p>{application.job.description}</p>
						</div>
					</Link>
					<hr />
				</div>
			)}</> : isLoading ? <AiOutlineLoading3Quarters className='job-loading' /> : <h1>No applications yet</h1>
		}
		</>
		
	)
}

const mapStateToProps = state => ({
	applications: state.omo.applications,
	isLoading: state.omo.isLoading
})

export default connect(mapStateToProps)(JobApplications)