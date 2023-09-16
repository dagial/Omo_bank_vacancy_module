import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { get_all_jobs } from '../actions/omo'
import "../styles/vaccant-table.style.scss"
import {FaCode} from "react-icons/fa"
import { Check_deadline } from './getdate'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const VacantTable=({ jobs, get_all_jobs, isLoading })=>{
    const navigate = useNavigate()
    useEffect(() => {
        get_all_jobs()
    }, [])
    return (
        <>
        { jobs && jobs != '' ?
        <div className="vacant-table-container">
            <div className="table-title">Open Recruitments</div>
            <div className="table-container">
            <table className="vacancy-table">
                <tbody>
                <tr className="table-header">
                    <th className="table-content content-position">Position</th>
                    <th className="table-content other-content">Vacant</th>
                    <th className="table-content other-content">Employment type</th>
                    <th className="table-content other-content">Branch</th>
                </tr>
                {jobs.map((job, index) => 
                    <tr className="table-raw" key={index} onClick={(e) => navigate(`/jobs/${job.id}`)}>
                        <td className="table-content content-position">
                        <div className='icon-container'><img className="content-position-icon" src={job.icon} alt='dep' /></div>
                        <div><h4>{job.title}</h4>
                        <div className="position-days">{Check_deadline(job.deadline)}</div>
                        </div>
                        </td>
                        <td className="table-content other-content">{job.vacant}</td>
                        <td className="table-content other-content">{job.employment_type}</td>
                        <td className="table-content other-content">{job.branch}</td>
                    </tr>
                )}
                </tbody>
            </table> 
            </div>
        </div>: isLoading ? <AiOutlineLoading3Quarters className='job-loading' /> : 
        <div className="vacant-table-container" style={{boxShadow: 'none', background: 'none'}}><h1>No jobs to show</h1></div>}
        </>
    )
}

const mapStateToProps = state => ({
    jobs: state.omo.all_jobs,
    isLoading: state.omo.isLoading
})

export default connect(mapStateToProps, { get_all_jobs })(VacantTable)