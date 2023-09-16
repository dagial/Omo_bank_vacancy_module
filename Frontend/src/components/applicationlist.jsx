import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/applist.scss'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Get_date_time } from './getdate'

const ApplicationList = ({ applications, isLoading, user, no_content, header }) => {
	return (
		<>
			{
				applications && applications != '' ?
				<div className='applications-container'>
				<h1>{header}</h1>
				<div className='applications-all'>
				{applications.map((application, index) => 
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
				<h1>{no_content}</h1>
			}
		</>
	)
}

const mapStateToProps = state => ({
	applications: state.omo.applications,
	isLoading: state.omo.isLoading,
	user: state.omo.user
})

export default connect(mapStateToProps)(ApplicationList)