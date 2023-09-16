import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/request.scss" 
import Search from "../components/search.component"
import Sidebar from "../components/sidebar"
import NavBar from '../components/NavBar'
import Footer from '../components/footer.component'
import JobList from '../components/joblistcomponent'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { connect } from 'react-redux'
import { load_departments, request_job } from '../actions/omo'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const NewRequest = ({ load_departments, request_job, departments, isAuthenticated, isLoading }) => {
	const navigate = useNavigate()
    const [newRequest, setNewRequest] = useState({
        title: "",
        work_unit: "",
        department: "IS",
        employment_type: "Permanent",
        description: "",
        experience_required: 0,
        branch: "",
        vacant: 0,
        gender_required: "Any",
        deadline: "",
        grade: "",
        salary: 0
    })
    const { title, work_unit, department, employment_type, description, experience_required, 
    branch, vacant, gender_required, deadline, grade, salary } = newRequest
    const [educational_requirements, setEducational_requirements] = useState({
        qualification_type: "None",
        qualification_department: "",
        minimum_grade_required: 0
    })
    const { qualification_type, qualification_department, minimum_grade_required } = educational_requirements
    useEffect(() => {
        load_departments()
    	if (!isAuthenticated) {
	        return navigate('/login')
	    } 
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        console.log("change occored")
        if (name === 'qualification_type' || name === 'qualification_department' || name === 'minimum_grade_required') {
            setEducational_requirements(prevEducation => ({...prevEducation, [name]: value}))
        } else {
            setNewRequest(prevRequest => ({...prevRequest, [name]: value}))
        }  
    }
    function handleSubmit(event) {
        event.preventDefault()
        request_job(newRequest, educational_requirements)
    }
    console.log(newRequest)
    return (
        <>
            <div className="request-container">
                <Helmet>
                    <title>Omo bank | New request</title>
                    <link rel="icon" href={headIcon} />
                    <meta name="description" content="Omo bank recruitment site"  />
                </Helmet>
                <NavBar menuItems={[{name: "Home", link: "/home", onclick: ""},
                                    {name: "About", link: "/about", onclick: ""}, 
                                    {name: "FAQs", link: "/faqs", onclick: ""},
                                    {name: "Applications", link: "/applications", onclick: ""}
                                    ]} 
                />
                <div className="request-body">
                    <Sidebar className="sidebar"/>
                    <div className="request-main-content">
                        <h1>Request new job</h1>
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
                                        <option value="">--------</option>
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
                            <h3>Educational requirement</h3>
                            <label htmlFor="qualification_type">Qualification type:
                                <select 
                                    id="qualification_type" 
                                    name="qualification_type" 
                                    value={qualification_type}
                                    onChange={handleChange}>
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
                                value={qualification_department} 
                                onChange={handleChange}
                                placeholder="Qualified departments" />
                            </label>
                            <label htmlFor="minimum_grade_required">Minimum Grade:
                                <input
                                    type="number"
                                    id="minimum_grade_required"
                                    name="minimum_grade_required"
                                    value={minimum_grade_required}
                                    onChange={handleChange} 
                                    />
                            </label>
                            <div className="request-loading">
                                    <button className="save-request">Send request</button>
                                    {isLoading ? <AiOutlineLoading3Quarters className="request-spinner" /> : <></>}
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
            
        </>
    )
}

const mapStateToProps = state => ({
    isLoading: state.omo.isLoading,
    departments: state.omo.departments,
    isAuthenticated: state.omo.isAuthenticated
})


export default connect(mapStateToProps, { load_departments, request_job })(NewRequest)