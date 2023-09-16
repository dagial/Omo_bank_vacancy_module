import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Get_date_time, Check_deadline } from './getdate'
import '../styles/joblist.scss'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function JobList(props) {
	const { jobs, isLoading, texts } = props
	return (
		<>
		{ jobs[texts.type] && jobs[texts.type] != null && jobs[texts.type] != "" ?
		jobs[texts.type].results && jobs[texts.type].results != null && jobs[texts.type].results != "" ?
			<>
			<h1>{texts.header}</h1>
			{
			jobs[texts.type].results.map(job =>
				<div className='job-container' key={job.id}>
					<Link to={`${job.id}`} className='linktojob'>
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
			)}</> : isLoading ? <AiOutlineLoading3Quarters className='job-loading' /> : <h1>{texts.no_content}</h1> :
			isLoading ? <AiOutlineLoading3Quarters className='job-loading' /> : <h1>{texts.no_content}</h1>
		}
		</>
		
	)
}

const mapStateToProps = state => ({
	jobs: state.omo,
	isLoading: state.omo.isLoading
})

export default connect(mapStateToProps)(JobList)