import axios from 'axios'
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED_SUCCESS,
	USER_LOADED_FAIL,
	AUTHENTICATED_SUCCESS,
	AUTHENTICATED_FAIL,
	LOADING,
	RETRIEVE_JOBS_SUCCESS,
	RETRIEVE_JOBS_FAIL,
	RETRIEVE_ALL_JOBS_SUCCESS,
	RETRIEVE_ALL_JOBS_FAIL,
	RETRIEVE_REQUESTS_SUCCESS,
	RETRIEVE_REQUESTS_FAIL,
	LOAD_JOB_SUCCESS,
	LOAD_JOB_FAIL,
	DISPLAY_SUCCESS,
	DISPLAY_FAIL,
	GET_EVENTS_SUCCESS,
	GET_EVENTS_FAIL,
	LOAD_APPLICATION_SUCCESS,
	LOAD_APPLICATION_FAIL,
	LOAD_DEPARTMENTS_SUCCESS,
	LOAD_DEPARTMENTS_FAIL,
	STAFF_LOADED_SUCCESS,
	STAFF_LOADED_FAIL,
	SAVE_JOB_SUCCESS,
	SAVE_JOB_FAIL,
	GET_APPLICATIONS_SUCCESS,
	GET_APPLICATIONS_FAIL,
	EDIT_ACCOUNT_SUCCESS,
	EDIT_ACCOUNT_FAIL,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_FAIL,
	CREATE_STAFF_SUCCESS,
	CREATE_STAFF_FAIL,
	PIE_CHART_SUCCESS,
	PIE_CHART_FAIL,
	LINE_CHART_SUCCESS,
	LINE_CHART_FAIL,
	CENSORSHIP_SUCCESS,
	CENSORSHIP_FAIL,
	APPLICATION_SUCCESS,
	APPLICATION_FAIL,
	SEARCH_SUCCESS,
	SEARCH_FAIL,
	PASSWORD_RESET_SUCCESS,
	PASSWORD_RESET_FAIL,
	PASSWORD_RESET_CONFIRM_SUCCESS,
	PASSWORD_RESET_CONFIRM_FAIL,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	ACTIVATION_SUCCESS,
	ACTIVATION_FAIL,
	LOGOUT
} from './types'

export const checkAuthenticated = () => async dispatch => {
	if (localStorage.getItem('access')) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}
		const body = JSON.stringify({ token: localStorage.getItem('access') })

		try {
			const res = await axios.post(`${process.env.REACT_APP_API_URL}/omo_bank/jwt/verify/`, body, config)
			if (res.data.code !== 'token_not_valid'){
				dispatch({
					type: AUTHENTICATED_SUCCESS
				})
			}
			else {
				dispatch({
					type: AUTHENTICATED_FAIL
				})
			}
		} catch (err) {
			dispatch({
				type: AUTHENTICATED_FAIL
			})
		}
	}
	else {
		dispatch({
			type: AUTHENTICATED_FAIL
		})
	}
}

export const load_user = () => async dispatch => {
	if (localStorage.getItem('access')) {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `JWT ${localStorage.getItem('access')}`,
				'Accept': 'application/json'
			}
		}
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/users/me/`, config)

			dispatch({
				type: USER_LOADED_SUCCESS,
				payload: res.data
			})
		} catch (err) {
			dispatch({
				type: USER_LOADED_FAIL
			})
		}
	}
	else {
		dispatch({
			type: USER_LOADED_FAIL
		})
	}
}

export const edit_account = (first_name, middle_name, last_name, phone) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `JWT ${localStorage.getItem('access')}`
		}
	}
	const body = JSON.stringify({ first_name, middle_name, last_name, phone })
	dispatch({ type: LOADING })
	try {
		const res = await axios.patch(`${process.env.REACT_APP_API_URL}/omo_bank/users/me/`, body, config)

		dispatch({
			type: EDIT_ACCOUNT_SUCCESS,
		})
		dispatch(load_user())
	} catch (err) {
		dispatch({
			type: EDIT_ACCOUNT_FAIL
		})
	}
}

export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	email = email.toLowerCase()
	const body = JSON.stringify({ email, password })

	dispatch({ type: LOADING })
	console.log(body)
	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/omo_bank/jwt/create/`, body, config)
		console.log(res)

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		})

		dispatch(load_user())
	} catch (err) {
		console.log(err)
		if (err.response) {
    		if (err.response.status === 401) {
		      	dispatch({
		      		type: LOGIN_FAIL,
		      		payload: err.response.data.detail
		      	})
			} else {
				dispatch({
					type: LOGIN_FAIL,
					payload: "An error occurred"
				})
			}
	  } else {
		    dispatch({
		      type: LOGIN_FAIL,
		      payload: err.message
	    })
	  }
	}
}

export const load_job = (id) => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Accept': 'application/json'
		}
	}
	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/jobs/${id}`, config)

		dispatch({
			type: LOAD_JOB_SUCCESS,
			payload: res.data
		})

	} catch (err) {
		dispatch({
			type: LOAD_JOB_FAIL
		})
	}
}

export const load_application = (id) => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Accept': 'application/json'
		}
	}
	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/applications/${id}`, config)

		dispatch({
			type: LOAD_APPLICATION_SUCCESS,
			payload: res.data
		})

	} catch (err) {
		dispatch({
			type: LOAD_APPLICATION_FAIL
		})
	}
}

export const get_jobs = (i) => async dispatch => {
	const config = {
		headers: {
			'Accept': 'application/json'
		}
	}

	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/jobs/?page=${i}`, config)

		dispatch({
			type: RETRIEVE_JOBS_SUCCESS,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: RETRIEVE_JOBS_FAIL
		})
	}
}

export const get_all_jobs = () => async dispatch => {
	const config = {
		headers: {
			'Accept': 'application/json'
		}
	}

	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/jobs/all/`, config)

		dispatch({
			type: RETRIEVE_ALL_JOBS_SUCCESS,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: RETRIEVE_ALL_JOBS_FAIL
		})
	}
}

export const schedule_screening = (screening_type, schedule, place, application, hruser) => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ screening_type, schedule, place, application, hruser })
	console.log(body)
	dispatch({ type: LOADING })
	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/omo_bank/schedule/`, body, config)

		dispatch({
			type: CREATE_JOB_SUCCESS
		})
	} catch (err) {
		dispatch({
			type: CREATE_JOB_FAIL
		})
	}
}

export const pie_chart = () => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Accept': 'application/json'
		}
	}
	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/applications/jobs/`, config)
		dispatch({
			type: PIE_CHART_SUCCESS,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: PIE_CHART_FAIL
		})
	}
}

export const line_chart = () => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Accept': 'application/json'
		}
	}
	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/applications/count/`, config)
		dispatch({
			type: LINE_CHART_SUCCESS,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: LINE_CHART_FAIL
		})
	}
}

export const load_departments = () => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Accept': 'application/json'
		}
	}
	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/departments/`, config)
		dispatch({
			type: LOAD_DEPARTMENTS_SUCCESS,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: LOAD_DEPARTMENTS_FAIL
		})
	}
}

export const request_job = (job, educational_requirements) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `JWT ${localStorage.getItem('access')}`
		}
	}
	const body = JSON.stringify({ job, educational_requirements })
	dispatch({ type: LOADING })
	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/omo_bank/jobs/request/`, body, config)
		dispatch({
			type: CREATE_JOB_SUCCESS
		})
	} catch (err) {
		console.log(err)
		dispatch({
			type: CREATE_JOB_FAIL
		})
	}
}

export const create_staff = (department, title, branch) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `JWT ${localStorage.getItem('access')}`
		}
	}
	const body = JSON.stringify({ department, title, branch })
	dispatch({ type: LOADING })
	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/omo_bank/user/staff/create/`, body, config)

		dispatch({
			type: CREATE_STAFF_SUCCESS
		})
		dispatch(load_user())
	} catch (err) {
		dispatch({
			type: CREATE_STAFF_FAIL
		})
	}
}

export const edit_staff = (department, title, branch, id) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `JWT ${localStorage.getItem('access')}`
		}
	}
	const body = JSON.stringify({ department, title, branch })
	dispatch({ type: LOADING })
	try {
		const res = await axios.put(`${process.env.REACT_APP_API_URL}/omo_bank/user/staff/update/${id}`, body, config)

		dispatch({
			type: CREATE_STAFF_SUCCESS
		})
		dispatch(load_user())
	} catch (err) {
		dispatch({
			type: CREATE_STAFF_FAIL
		})
	}
}

export const censor = (id, status) => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ is_published: status })
	dispatch({ type: LOADING })
	try {
		const res = await axios.patch(`${process.env.REACT_APP_API_URL}/omo_bank/jobs/censor/${id}`, body, config)
		dispatch({
			type: CENSORSHIP_SUCCESS
		})
	} catch (err) {
		dispatch({
			type: CENSORSHIP_FAIL
		})
	}
}

export const get_requests = (i) => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Accept': 'application/json'
		}
	}

	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/jobs/listrequests/?page=${i}`, config)

		dispatch({
			type: RETRIEVE_REQUESTS_SUCCESS,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: RETRIEVE_REQUESTS_FAIL
		})
	}
}

export const update_job = (job, id) => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify(job)
	dispatch({ type: LOADING})
	try {
		const res = await axios.put(`${process.env.REACT_APP_API_URL}/omo_bank/jobs/update/${id}`, body, config)
		dispatch({
			type: SAVE_JOB_SUCCESS
		})
	} catch (err) {
		dispatch({
			type: SAVE_JOB_FAIL
		})
	}
}

export const get_applications = (type) => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Accept': 'application/json'
		},
		params: {
			'Type': type
		}
	}
	dispatch({ type: LOADING})
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/applications/list/`, config)
		dispatch({
			type: GET_APPLICATIONS_SUCCESS,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: GET_APPLICATIONS_FAIL
		})
	}
}

export const shortlist_status = (id, status) => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ is_shortlisted: status })
	dispatch({ type: LOADING })
	try {
		const res = await axios.patch(`${process.env.REACT_APP_API_URL}/omo_bank/applications/shortlist/${id}`, body, config)
		dispatch({
			type: APPLICATION_SUCCESS
		})
	} catch (err) {
		dispatch({
			type: APPLICATION_FAIL
		})
	}
}

export const search = (model, query) => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Accept': 'application/json'
		},
		params: {
			'Model': model,
			'search': query
		}
	}
	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/user/search/`, config)
		dispatch({
			type: SEARCH_SUCCESS,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: SEARCH_FAIL
		})
	}
}

export const apply = (user, job) => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ user, job })
	dispatch({ type: LOADING })
	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/omo_bank/applications/apply/`, body, config)
		dispatch({
			type: APPLICATION_SUCCESS
		})
	} catch (err) {
		dispatch({
			type: APPLICATION_FAIL
		})
	}
}

export const display_boxes = () => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Accept': 'application/json'
		}
	}
	dispatch({ type: LOADING })
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/applications/display/`, config)
		dispatch({
			type: DISPLAY_SUCCESS,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: DISPLAY_FAIL
		})
	}
}

export const get_events = (date) => async dispatch => {
	const config = {
		headers: {
			'Authorization': `JWT ${localStorage.getItem('access')}`,
			'Accept': 'application/json'
		},
		params: {
			'date': date
		}
	}
	dispatch({ type: LOADING})
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/schedule/get/`, config)
		dispatch({
			type: GET_EVENTS_SUCCESS,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: GET_EVENTS_FAIL
		})
	}
}

export const signup = (first_name, middle_name, last_name, email, phone, password, re_password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	const body = JSON.stringify({ first_name, middle_name, last_name, email, phone, password, re_password })
	dispatch({ type: LOADING })
	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/omo_bank/users/`, body, config)
		console.log(res)
		dispatch({
			type: SIGNUP_SUCCESS,
			payload: res.data
		})
	} catch (err) {
		console.log(err)
		if (err.response) {
    		if (err.response.status === 400) {
		      	if (err.response.data.email) {
		      		dispatch({
		      			type: SIGNUP_FAIL,
		      			payload: err.response.data.email
		      		})
		      	} else if (err.response.data.phone) {
		      		dispatch({
		      			type: SIGNUP_FAIL,
		      			payload: err.response.data.phone
		      		})
		      	} else if (err.response.data.password) {
		      		dispatch({
		      			type: SIGNUP_FAIL,
		      			payload: err.response.data.password
		      		})
		      	} else {
		      		dispatch({
		      			type: SIGNUP_FAIL,
		      			payload: "Something wrong with the data submitted"
		      		})
		      	}
			} else {
				dispatch({
					type: SIGNUP_FAIL,
					payload: "An error occurred"
				})
			}
	  } else {
		    console.log(err)
		    dispatch({
		      type: SIGNUP_FAIL,
		      payload: err.message
	    })
	  }
	}
}

export const activation = (uid, token) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	const body = JSON.stringify({ uid, token })

	try {
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/omo_bank/users/activation/`, body, config)

		dispatch({
			type: ACTIVATION_SUCCESS
		})
	} catch (err) {
		dispatch({
			type: ACTIVATION_FAIL
		})
	}
}

export const reset_password = (email) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ email })

	try {
		await axios.post(`${process.env.REACT_APP_API_URL}/omo_bank/users/reset_password/`, body, config)
		dispatch({
			type: PASSWORD_RESET_SUCCESS
		})
	} catch (err) {
		dispatch({
			type: PASSWORD_RESET_FAIL
		})
	}
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ uid, token, new_password, re_new_password })

	try {
		await axios.post(`${process.env.REACT_APP_API_URL}/omo_bank/users/reset_password_confirm`, body, config)
		dispatch({
			type: PASSWORD_RESET_CONFIRM_SUCCESS
		})
	} catch (err) {
		dispatch({
			type: PASSWORD_RESET_CONFIRM_FAIL
		})
	}
}

export const logout = () => dispatch => {
	dispatch({
		type: LOGOUT
	})
}