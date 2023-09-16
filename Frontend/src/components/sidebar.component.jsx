import React, { useEffect } from 'react'
import {SlHome} from "react-icons/sl"
import {TiThListOutline} from "react-icons/ti"
import {BsPeople} from "react-icons/bs"
import {BiCalendar} from "react-icons/bi"
import {IoSettingsOutline} from "react-icons/io5"
import {CgProfile} from "react-icons/cg"
import "../styles/sidebar.style.scss"
import { connect } from 'react-redux'
import { load_user } from '../actions/omo'

const SideBar=({ load_user, user, isAuthenticated })=>{
    useEffect(() => {
        load_user()
    }, [])
    return (
        <div className="sidebar-container">
            <div className="sidebar-main-option">
                <div className="main-options">
                    <SlHome className="options"/>
                    <span className="options">Dashboard</span>
                </div>
                <div className="main-options">
                    <TiThListOutline className="options"/>
                    <span className="options">Jobs</span>
                </div>
                <div className="main-options">
                    <BsPeople className="options"/>
                    <span className="options">Candidates</span>
                </div>
                <div className="main-options">
                    <BiCalendar className="options"/>
                    <span className="options">Calender</span>
                </div>
                <div className="main-options">
                    <IoSettingsOutline className="options"/>
                    <span className="options">Settings</span>
                </div>
            </div>
            <div className="filter-options">
                <div className="filter-title">Filters</div>
                <div className="filter-option">
                <input type="radio" name="filter" id="All"/>
                <label htmlFor="All">All</label>
                </div>
                <div className="filter-option">
                <input type="radio" name="filter" id="applications"/>
                <label htmlFor="applications">Applications</label>
                </div>
                <div className="filter-option">
                <input type="radio" name="filter" id="Candidates"/>
                <label htmlFor="Candidates">Candidates</label>
                </div>
                <div className="filter-option">
                <input type="radio" name="filter" id="Interviewees"/>
                <label htmlFor="Interviewees">Interviewees</label>
                </div>
                <div className="filter-option">
                <input type="radio" name="filter" id="Jobs"/>
                <label htmlFor="Jobs">Jobs</label>
                </div>
            </div>
            <div className="sidebar-profile-container">
                <CgProfile/>
                <div className="profile-name">
                    <div>{JSON.stringify(isAuthenticated).toUpperCase()}</div>
                    <div className="profile-bank">OMO Bank</div>
                    </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.omo.isAuthenticated
})

export default connect(mapStateToProps, { load_user })(SideBar)