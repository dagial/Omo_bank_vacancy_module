import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "../styles/settings.scss"
import Sidebar from "../components/sidebar"
import NavBar from '../components/NavBar'
import Footer from '../components/footer.component'
import { edit_account, load_departments, load_staff, create_staff, edit_staff } from '../actions/omo'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { connect } from 'react-redux'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'

const Settings = ({ user, isAuthenticated, isLoading, edit_staff, create_staff, edit_account, load_departments, departments }) => {
	const navigate = useNavigate()
    const [page, setPage] = useState(true)
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
        phonenumber: "",
        title: "",
        branch: "",
        departmentname: ""
    })
    const { firstname, middlename, lastname, phonenumber, title, branch, departmentname } = formData
    useEffect(() => {
        if (!isAuthenticated) {
	        return navigate('/login')
	    }
        load_departments()
        if (user) {
            setFormData (prevFormData => ({
                ...prevFormData,
                firstname: user.first_name,
                middlename: user.middle_name,
                lastname: user.last_name,
                phonenumber: user.phone
            }))
            let temp = user.user_type.split(" ").join("").toLowerCase()
            if (temp === 'departmentuser' || temp === 'hruser') {
                console.log(user.user_type.split(" ").join("").toLowerCase())
                if (user[user.user_type.split(" ").join("").toLowerCase()]) {
                    setEdit(true)
                    console.log(edit)
                    setFormData (prevFormData => ({
                        ...prevFormData,
                        title: user[user.user_type.split(" ").join("").toLowerCase()].title,
                        branch: user[user.user_type.split(" ").join("").toLowerCase()].branch,
                        departmentname: user[user.user_type.split(" ").join("").toLowerCase()].department
                    }))
                }
            }            
        }
    }, [isAuthenticated])
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => ({...prevFormData, [name]: value}))
    }
    function pageChange() {
        setPage(prevPage => !prevPage)
    }
    function submitHandler(event) {
        event.preventDefault()
        if (firstname != user.first_name || middlename != user.middle_name || lastname != user.last_name || phonenumber != user.phone) {
            edit_account(firstname, middlename, lastname, phonenumber)
            navigate('/home')
            window.location.reload()
        } else {
            alert('no changes')
        }
    }
    function createStaff(event) {
        event.preventDefault()
        if (edit) {
            edit_staff(departmentname, title, branch, user.id)
        } else {
            create_staff(departmentname, title, branch)
        }
        window.location.reload()
    }
    return (
        <>
            <div className="settings-container">
                <Helmet>
                    <title>Omo bank | Settings</title>
                    <link rel="icon" href={headIcon} />
                    <meta name="description" content="Omo bank recruitment site"  />
                </Helmet>
                <NavBar menuItems={[{name: "Home", link: "/home", onclick: ""},
                                    {name: "About", link: "/about", onclick: ""}, 
                                    {name: "FAQs", link: "/faqs", onclick: ""},
                                    {name: "Applications", link: "/applications", onclick: ""}
                                    ]} 
                />
                <div className="settings-body">
                    <Sidebar className="sidebar"/>
                    <div className="settings-main-content">
                        <div className="settings-box">
                            <h2><FiSettings /> Settings</h2>
                            {page ?
                            <form onSubmit={submitHandler}>
                                <label htmlFor="fname">
                                First Name:
                                    <input
                                        type="text"
                                        name="firstname"
                                        id="fname"
                                        placeholder={user? user.first_name : "firstname"}
                                        value={firstname}
                                        onChange={handleChange}
                                        required />
                                </label>
                                <label htmlFor="mname">
                                Father's Name:
                                    <input
                                        type="text"
                                        name="middlename"
                                        id="mname"
                                        placeholder={user? user.middle_name : "middlename"}
                                        value={middlename}
                                        onChange={handleChange}
                                        required />
                                </label>
                                <label htmlFor="lname">
                                Grandfather's Name:
                                    <input
                                        type="text"
                                        name="lastname"
                                        id="lname"
                                        placeholder={user? user.last_name : "lastname"}
                                        value={lastname}
                                        onChange={handleChange}
                                        required />
                                </label>
                                <label htmlFor="phone">
                                Phone number:
                                    <input
                                        type="phone"
                                        name="phonenumber"
                                        id="phone"
                                        placeholder={user? user.phone : "phone"}
                                        value={phonenumber}
                                        onChange={handleChange}
                                        required />
                                </label>
                                <div className="settings-loading">
                                    <button className="save-settings">Save</button>
                                    {isLoading ? <AiOutlineLoading3Quarters className="setting-spinner" /> : <></>}
                                </div>
                            </form> :
                            <form onSubmit={createStaff}>
                                <label htmlFor="fname">
                                Department:
                                    <select
                                    value={departmentname}
                                    name="departmentname"
                                    required
                                    onChange={handleChange}>
                                        {departments && departments.map(department => <option 
                                            key={department.name} 
                                            value={department.name}>
                                            {department.name}</option>)}
                                    </select>
                                </label>
                                <label htmlFor="title">
                                Title:
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        required
                                        placeholder={title}
                                        value={title}
                                        onChange={handleChange} />
                                </label>
                                <label htmlFor="title">
                                Branch:
                                    <input
                                        type="text"
                                        name="branch"
                                        id="branch"
                                        placeholder={branch}
                                        value={branch}
                                        onChange={handleChange}
                                        required />
                                </label>
                                <div className="settings-loading">
                                    <button className="save-settings">Save</button>
                                    {isLoading ? <AiOutlineLoading3Quarters className="setting-spinner" /> : <></>}
                                </div>
                            </form>}
                            <div className="settings-bottom">
                                <Link to="/reset-password" className="settings-link">Reset Password</Link>
                                {user ? user.user_type.toLowerCase()==="recruit" ? 
                                <Link to={user.recruit ? `/registration/edit/${user.id}` : "/registration"} className="settings-link">Edit Recruit Account Details</Link> : 
                                <Link to="" className="settings-link" onClick={pageChange}>Edit {page ? <>Staff</> : <>Account</>} Details</Link> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
const mapStateToProps = state => ({
    user: state.omo.user,
    isLoading: state.omo.isLoading,
    departments: state.omo.departments,
    isAuthenticated: state.omo.isAuthenticated
})


export default connect(mapStateToProps, { edit_account, edit_staff, load_departments, create_staff })(Settings)