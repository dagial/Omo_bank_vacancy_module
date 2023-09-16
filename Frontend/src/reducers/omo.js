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
	PIE_CHART_SUCCESS,
	PIE_CHART_FAIL,
	LINE_CHART_SUCCESS,
	LINE_CHART_FAIL,
	LOAD_DEPARTMENTS_SUCCESS,
	LOAD_DEPARTMENTS_FAIL,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_FAIL,
	SAVE_JOB_SUCCESS,
	SAVE_JOB_FAIL,
	APPLICATION_SUCCESS,
	APPLICATION_FAIL,
	LOAD_APPLICATION_SUCCESS,
	LOAD_APPLICATION_FAIL,
	GET_EVENTS_SUCCESS,
	GET_EVENTS_FAIL,
	SEARCH_SUCCESS,
	SEARCH_FAIL,
	EDIT_ACCOUNT_SUCCESS,
	EDIT_ACCOUNT_FAIL,
	GET_APPLICATIONS_SUCCESS,
	GET_APPLICATIONS_FAIL,
	CREATE_STAFF_SUCCESS,
	CREATE_STAFF_FAIL,
	STAFF_LOADED_SUCCESS,
	STAFF_LOADED_FAIL,
	CENSORSHIP_SUCCESS,
	CENSORSHIP_FAIL,
	PASSWORD_RESET_SUCCESS,
	PASSWORD_RESET_FAIL,
	PASSWORD_RESET_CONFIRM_SUCCESS,
	PASSWORD_RESET_CONFIRM_FAIL,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	ACTIVATION_SUCCESS,
	ACTIVATION_FAIL,
	LOGOUT
} from '../actions/types'

const initialState = {
	access: localStorage.getItem('access'),
	refresh: localStorage.getItem('refresh'),
	isAuthenticated: null,
	isLoading: false,
	user: null,
	error: null
}

export default function omo(state = initialState, action) {
	const { type, payload, error } = action

	switch(type) {
		case AUTHENTICATED_SUCCESS:
			return {
				...state,
				isAuthenticated: true
			}
		case LOGIN_SUCCESS:
			localStorage.setItem('access', payload.access)
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				access: payload.access,
				refresh: payload.refresh
			}
		case SIGNUP_SUCCESS:
			return {
				...state,
				isAuthenticated: false
			}
		case USER_LOADED_SUCCESS:
			return {
				...state,
				user: payload
			}
		case LOADING:
			return {
				...state,
				isLoading: true
			}
		case RETRIEVE_JOBS_SUCCESS:
			return {
				...state,
				isLoading: false,
				jobs: payload
			}
		case RETRIEVE_ALL_JOBS_SUCCESS:
			return {
				...state,
				isLoading: false,
				all_jobs: payload
			}
		case RETRIEVE_REQUESTS_SUCCESS:
			return {
				...state,
				requests: payload
			}
		case LOAD_JOB_SUCCESS:
			return {
				...state,
				job: payload,
				isLoading: false
			}
		case LOAD_DEPARTMENTS_SUCCESS:
			return {
				...state,
				departments: payload,
				isLoading: false
			}
		case STAFF_LOADED_SUCCESS:
			return {
				...state,
				isLoading: false,
				staff: payload
			}
		case EDIT_ACCOUNT_SUCCESS:
			return {
				...state,
				isLoading: false,
				editAccount: true
			}
		case CENSORSHIP_SUCCESS:
			return {
				...state,
				censorship: true,
				isLoading: false
			}
		case GET_APPLICATIONS_SUCCESS:
			return {
				...state,
				isLoading: false,
				applications: payload
			}
		case SEARCH_SUCCESS:
			return {
				...state,
				isLoading: false,
				results: payload
			}
		case DISPLAY_SUCCESS:
			return {
				...state,
				isLoading: false,
				display: payload
			}
		case LOAD_APPLICATION_SUCCESS:
			return {
				...state,
				isLoading: false,
				application: payload
			}
		case GET_EVENTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				events: payload
			}
		case PIE_CHART_SUCCESS:
			return {
				...state,
				isLoading: false,
				pie_data: payload
			}
		case LINE_CHART_SUCCESS:
			return {
				...state,
				isLoading: false,
				line_data: payload
			}
		case AUTHENTICATED_FAIL:
			return {
				...state,
				isAuthenticated: false,
				error: error
			}
		case USER_LOADED_FAIL:
			return {
				...state,
				user: null
			}
		case RETRIEVE_JOBS_FAIL:
			return {
				...state,
				jobs: null,
				isLoading: false,
				error: error
			}
		case CENSORSHIP_FAIL:
			return {
				...state,
				censorship: false,
				isLoading: false
			}
		case EDIT_ACCOUNT_FAIL:
			return {
				...state,
				editAccount: false,
				isLoading: false
			}
		case LOGIN_FAIL:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				access: null,
				refresh: null,
				user: null,
				error: payload
			}
		case SIGNUP_FAIL:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				access: null,
				refresh: null,
				user: null,
				error: payload
			}
		case LOGOUT:
			localStorage.removeItem('access')
			localStorage.removeItem('refresh')
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
				access: null,
				refresh: null,
				user: null
			}
		case SEARCH_FAIL:
			return {
				...state,
				isLoading: false,
				results: ''
			}
		case PIE_CHART_FAIL:
		case LINE_CHART_FAIL:
		case GET_EVENTS_FAIL:
		case DISPLAY_FAIL:
		case LOAD_APPLICATION_FAIL:
		case GET_APPLICATIONS_FAIL:
		case APPLICATION_SUCCESS:
		case APPLICATION_FAIL:
		case SAVE_JOB_SUCCESS:
		case SAVE_JOB_FAIL:
		case CREATE_JOB_SUCCESS:
		case CREATE_JOB_FAIL:
		case CREATE_STAFF_SUCCESS:
		case CREATE_STAFF_FAIL:
		case PASSWORD_RESET_SUCCESS:
		case PASSWORD_RESET_FAIL:
		case PASSWORD_RESET_CONFIRM_SUCCESS:
		case STAFF_LOADED_FAIL:
		case PASSWORD_RESET_CONFIRM_FAIL:
		case LOAD_JOB_FAIL:
		case LOAD_DEPARTMENTS_FAIL:
		case RETRIEVE_REQUESTS_FAIL:
		case ACTIVATION_SUCCESS:
		case ACTIVATION_FAIL:
			return {
				...state,
				isLoading: false
			}
		default:
			return state
	}
}