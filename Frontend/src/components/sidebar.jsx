import React, { useState } from 'react'
import { connect } from 'react-redux'
import { load_user } from '../actions/omo'
import { NavLink } from 'react-router-dom'
import { FaTh, FaSuitcase, FaRegCalendarAlt } from 'react-icons/fa'
import { FiSettings, FiUsers } from 'react-icons/fi'
import { GoGraph } from 'react-icons/go'
import { CgProfile } from 'react-icons/cg'
import { MdOutlinePublishedWithChanges } from 'react-icons/md'
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarRightExpand } from 'react-icons/tb'
import '../styles/sidebar.scss'

const Sidebar = ({ user }) => {
	function capitalize(word) {
		return word[0].toUpperCase() + word.slice(1).toLowerCase()
	}
	function replace_space(str) {
		return str.split(' ').join('_')
	}

	let option = 'Recruit'

	user ?  option = replace_space(capitalize(user.user_type)) : option = option 
	const [isOpen, setIsOpen] = useState(false)
	const toggle = () => setIsOpen(!isOpen)
	const users = {
		Recruit: [
				{
					path: '/home',
					name: 'Dashboard',
					icon: <FaTh />
				},
				{
					path: '/jobs',
					name: 'Jobs',
					icon: <FaSuitcase />
				},
				{
					path: '/calendar',
					name: 'Calendar',
					icon: <FaRegCalendarAlt />
				},
				{
					path: '/settings',
					name: 'Settings',
					icon: <FiSettings />
				}
			],
			Hr_user: [
				{
					path: '/home',
					name: 'Dashboard',
					icon: <FaTh />
				},
				{
					path: '/analytics',
					name: 'Analytics',
					icon: <GoGraph />
				},
				{
					path: '/jobs',
					name: 'Jobs',
					icon: <FaSuitcase />
				},
				{
					path: '/calendar',
					name: 'Calendar',
					icon: <FaRegCalendarAlt />
				},
				{
					path: '/candidates',
					name: 'Candidates',
					icon: <FiUsers />
				},
				{
					path: '/requests',
					name: 'Requests',
					icon: <MdOutlinePublishedWithChanges />
				},
				{
					path: '/settings',
					name: 'Settings',
					icon: <FiSettings />
				}
			],
			Department_user: [
				{
					path: '/home',
					name: 'Dashboard',
					icon: <FaTh />
				},
				{
					path: '/analytics',
					name: 'Analytics',
					icon: <GoGraph />
				},
				{
					path: '/jobs',
					name: 'Jobs',
					icon: <FaSuitcase />
				},
				{
					path: '/candidates',
					name: 'Candidates',
					icon: <FiUsers />
				},
				{
					path: '/requests',
					name: 'Requests',
					icon: <MdOutlinePublishedWithChanges />
				},
				{
					path: '/settings',
					name: 'Settings',
					icon: <FiSettings />
				}
			]
	}
	
	return (
		<div className='sidebar-container'>
			<div className='sidebar' style={{width: isOpen ? '70%' : 'fit-content'}} onMouseEnter={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}>
				{ user ?
					users[option].map((item, index) => (
						<NavLink 
						to={item.path} 
						key={index} 
						className={(navdata) => (navdata.isActive ? 'active' : 'link')} >
							<div className='icon'  style={{paddingRight: isOpen ? '15px' : '0px'}}>{item.icon}</div>
							<div className='link_text' style={{display: isOpen ? 'block' : 'none'}}>{item.name}</div>
						</NavLink>
					)) : <></>
				}
				<div className='bottom-content'>
					<p className='toggle-icon' onClick={toggle}><CgProfile /></p>
					<div className='username' style={{ display: isOpen ? 'block' : 'none', transition: '0.5s ease' }} >	
						{user ? <><h5>{capitalize(user.first_name)}</h5><p>{capitalize(user.user_type)}</p></> : <h5>FirstName</h5>}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
  user: state.omo.user
})

export default connect(mapStateToProps)(Sidebar)