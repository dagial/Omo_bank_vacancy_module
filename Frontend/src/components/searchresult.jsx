import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/applist.scss'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Get_date_time, Check_deadline } from './getdate'

const SearchResult = (props) => {
	const { type, list, isLoading } = props
	return (
		type === 'user' ?
		<>
			{
				list && list != '' ?
				<div className='applications-container'>
				<h1>Results</h1>
				<div className='applications-all'>
				{list.map((application, index) => 
					<div className='application-box' key={index}>
						<Link to={`/applications/${application.id}`} className='app-link'>
							<div className='application-content'>
								<div className='applicant-img-container'>
									<img className='applicant-photo' src={application.user.recruit.photograph} alt='Applicant Photo' />
								</div>
								<div className='application-text-content'>
									<h3>{`${application.user.first_name} ${application.user.middle_name}`}</h3>
									<h3>{application.job.title}</h3>
									<p>Submitted on {Get_date_time(application.application_date)}</p>
								</div>
							</div>
						</Link>
					</div>
				)} </div></div> : isLoading ? 
				<AiOutlineLoading3Quarters className='app-loading' /> : 
				<h1>No results found</h1>
			}
		</> :
		<>
		{ list && list != "" ?
			<>
			<h1>Results</h1>
			{
			list.map(job =>
				<div className='job-container' key={job.id}>
					<Link to={`/jobs/${job.id}`} className='linktojob'>
						<div className='job-header'>
							<div className='img-title'>
								<img src={job.icon} alt='dep' />
								<div className='title-date'>
									<h2>{job.title}</h2>
									<p>Posted on {Get_date_time(job.date_created)}</p>
								</div>
							</div>
							<div className='vacants'>
								<p>{job.vacant > 1 ? `${job.vacant} vacancies` : `${job.vacant} vacancy`} | {Check_deadline(job.deadline)}</p>
							</div>
						</div>
						<div className='description'>
							<p>{job.description}</p>
						</div>
					</Link>
					<hr />
				</div>
			)}</> : isLoading ? <AiOutlineLoading3Quarters className='job-loading' /> : <h1>No results found</h1>
		}
		</>
	)
}

const mapStateToProps = state => ({
	isLoading: state.omo.isLoading
})

export default connect(mapStateToProps)(SearchResult)