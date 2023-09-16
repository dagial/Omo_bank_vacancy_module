import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/request.scss'
import Search from "../components/search.component"
import Sidebar from "../components/sidebar"
import NavBar from '../components/NavBar'
import Footer from '../components/footer.component'
import JobList from '../components/joblistcomponent'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { connect } from 'react-redux'
import { get_requests, load_departments, update_job, censor } from '../actions/omo'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const EditRequest = ({ get_requests, update_job, censor, user, load_departments, requests, departments, isAuthenticated, isLoading }) => {
    const navigate = useNavigate()
    const state = useState
    const params = useParams()
    const id = params.id
    const [request, setRequest] = useState({
        title: "",
        work_unit: "",
        department: "",
        employment_type: "",
        description: "",
        experience_required: "",
        branch: "",
        vacant: "",
        gender_required: "",
        deadline: "",
        grade: "",
        salary: "",
        educational_requirement: [],
        is_published: ""
    })
    const { title, work_unit, department, employment_type, description, experience_required, 
    branch, vacant, gender_required, deadline, grade, salary, educational_requirement } = request
    useEffect(() => {
        load_departments()
        get_requests()
    	if (!isAuthenticated) {
	        return navigate('/login')
	    }
        if (requests.results) {
            for (let i = 0; i < requests.results.length; i++) {
                if (requests.results[i].id == id) {
                    setRequest(requests.results[i])                }
            }
        } 
    }, [])
    function handleChange(event) {
        const { name, value } = event.target
        setRequest(prevRequest => ({...prevRequest, [name]: value}))
    }
    function handleChangeEd(index, name, value) {
        let newArr = [...educational_requirement]
        newArr[index][name] = value
        setRequest(prevRequest => ({...prevRequest, educational_requirement: newArr}))
    }
    function handleSubmit(event) {
        event.preventDefault()
        update_job(request, id)
        if (user.user_type.toLowerCase() === 'hr user')
            censor(id, true)
        navigate('/home')
    }
    return (
        <>
            <div className="request-container">
                <Helmet>
                    <title>Omo bank | Requests</title>
                    <link rel="icon" href={headIcon} />
                    <meta name="description" content="Omo bank recruitment site"  />
                </Helmet>
                <NavBar menuItems={[{name: "Home", link: "/home", onclick: ""},
                                    {name: "About", link: "/about", onclick: ""}, 
                                    {name: "FAQs", link: "/faqs", onclick: ""},
                                    {name: "Vacancies", link: "/vacancies", onclick: ""},
                                    {name: "Applications", link: "/applications", onclick: ""}
                                    ]} 
                />
                <div className="request-body">
                    <Sidebar className="sidebar"/>
                    <div className="request-main-content">
                        <h1>Edit Request</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="title"> Title:
                                <input type="text" id="title" placeholder="Job title" required name="title" value={title} onChange={handleChange} />
                            </label>
                            <label htmlFor="workunit"> Work Unit:
                                <input type="text" required id="workunit" placeholder="Work unit" name="work_unit" value={work_unit} onChange={handleChange} />
                            </label>
                            <label htmlFor="dep"> Department:
                                <select
                                    value={department}
                                    name="department"
                                    required
                                    onChange={handleChange}>
                                    { departments ? departments.map(department => <option 
                                        key={department.name} 
                                        value={department.name}>
                                        {department.name}</option>) : <></>}
                                </select>
                            </label>
                            <label htmlFor="emp_type"> Employment Type:
                                <select 
                                    id="emp_type" 
                                    name="employment_type" 
                                    value={employment_type}
                                    required
                                    onChange={handleChange}>
                                    <option value="Permanent">Permanent</option>
                                    <option value="Temporary">Temporary</option>
                                </select>
                            </label>
                            <label htmlFor="desc">Description:
                                <textarea name="description" minLength="20" placeholder="Job description" required id="desc" value={description} onChange={handleChange} />
                            </label>
                            <label htmlFor="exp">Minimum Years of work experience:
                                <input
                                    type="number"
                                    id="exp"
                                    name="experience_required"
                                    value={experience_required}
                                    required
                                    onChange={handleChange} 
                                    />
                            </label>
                            <label htmlFor="branch">Branch:
                                <input
                                    type="text"
                                    id="branch"
                                    name="branch"
                                    value={branch}
                                    required
                                    placeholder="Branch"
                                    onChange={handleChange} 
                                    />
                            </label>
                            <label htmlFor="vacant">Vacant:
                                <input
                                    type="number"
                                    id="vacant"
                                    name="vacant"
                                    value={vacant}
                                    required
                                    onChange={handleChange} 
                                    />
                            </label>
                            <label htmlFor="gender_req">Gender required:
                                <select 
                                    id="gender_req" 
                                    name="gender_required" 
                                    value={gender_required}
                                    required
                                    onChange={handleChange}>
                                    <option value="Any">Any</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </label>
                            <label htmlFor="deadline">Deadline:
                                <input
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    value={deadline}
                                    required
                                    onChange={handleChange} 
                                    />
                            </label>
                            <label htmlFor="grade">Grade:
                                <input
                                    type="text"
                                    id="grade"
                                    name="grade"
                                    value={grade}
                                    onChange={handleChange}
                                    placeholder="Pay grade" 
                                    />
                            </label>
                            <label htmlFor="salary">Salary:
                                <input
                                    type="number"
                                    id="salary"
                                    name="salary"
                                    value={salary}
                                    onChange={handleChange} 
                                    />
                            </label>
                            {educational_requirement ?
                            <>
                            <h3>Educational requirement</h3>
                            {
                            educational_requirement.map((requirementItem, index) => 
                                <div key={index}>
                                <label htmlFor="qualification_type">Qualification type:
                                    <select 
                                        id="qualification_type" 
                                        name="qualification_type"
                                        value={educational_requirement[index].qualification_type}
                                        onChange={(e) => handleChangeEd(index, e.target.name, e.target.value)}>
                                        <option value="None">None</option>
                                        <option value="Grade 8">Grade 8</option>
                                        <option value="Grade 10">Grade 10</option>
                                        <option value="Grade 12">Grade 12</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="BSc">BSc</option>
                                        <option value="MSc">MSc</option>
                                        <option value="MSc/BSc">MSc/BSc</option>
                                    </select>
                                </label>
                                <label htmlFor="dept">Departments:
                                    <textarea name="qualification_department"
                                    id="dept" 
                                    value={educational_requirement[index].qualification_department}
                                    onChange={(e) => handleChangeEd(index, e.target.name, e.target.value)}
                                    placeholder="Qualified departments" />
                                </label>
                                <label htmlFor="minimum_grade_required">Minimum Grade:
                                    <input
                                        type="number"
                                        id="minimum_grade_required"
                                        name="minimum_grade_required"
                                        value={educational_requirement[index].minimum_grade_required}
                                        onChange={(e) => handleChangeEd(index, e.target.name, e.target.value)} 
                                        />
                                </label> 
                                </div>
                            )}
                            </> : <></>}
                            <div className="request-loading">
                                {user ? user.user_type.toLowerCase() === "hr user" ?
                                 <button name='publish' className="save-request">Save & publish</button>
                                : <button name='save_request' className="save-request">Save request</button>
                                : <></>}
                                {isLoading ? <AiOutlineLoading3Quarters className="request-spinner" /> : <></>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
const mapStateToProps = state => ({
    requests: state.omo.requests,
    user: state.omo.user,
    isLoading: state.omo.isLoading,
    departments: state.omo.departments,
    isAuthenticated: state.omo.isAuthenticated
})


export default connect(mapStateToProps, { get_requests, censor, load_departments, update_job })(EditRequest)