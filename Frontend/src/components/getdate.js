function Get_ampm(hr, min) {
	if (min === 0) {
		min = `${min}${min}`
	}
	if (hr >= 12) {
		hr = hr % 12
		if (hr === 0) {
			return (`12:${min} PM`)
		}
		return (`${hr}:${min} PM`)
	}
	else if (hr === 0) {
		return (`12:${min} AM`)
	}
	else {
		return (`${hr}:${min} AM`)
	}
}

export function Get_time(apidate) {
	let timestamp = new Date(apidate).getTime()
	let Hour = new Date(timestamp).getHours()
	let Minute = new Date(timestamp).getMinutes()
	let Time = Get_ampm(Hour, Minute)
	return (Time)
}

export function Get_date_time(apidate) {
	let timestamp = new Date(apidate).getTime()
	let Hour = new Date(timestamp).getHours()
	let Minute = new Date(timestamp).getMinutes()
	let Day = new Date(timestamp).getDate()
	let Month = new Date(timestamp).toLocaleString('default', { month: 'short' })
	let Year = new Date(timestamp).getFullYear()
	let Time = Get_ampm(Hour, Minute)
	let Date_time = `${Month} ${Day}, ${Year} at ${Time}`
	return (Date_time)
}

export function Get_date(apidate) {
	let timestamp = new Date(apidate).getTime()
	let Day = new Date(timestamp).getDate()
	let Month = new Date(timestamp).toLocaleString('default', { month: 'short' })
	let Year = new Date(timestamp).getFullYear()
	let Da_te = `${Month} ${Day}, ${Year}`
	return (Da_te)
}

export function Check_deadline(deadline) {
	let today = new Date().getTime()
	let deadline_timestamp = new Date(deadline).getTime()
	let timestamp_difference = deadline_timestamp - today
	if (timestamp_difference < 0) {
		return ('expired')
	}
	if (timestamp_difference === 0) {
		return ('Last day')
	}
	let days_left = new Date(timestamp_difference).getDate()
	if (days_left === 1) {
		return ('1 day left')
	}
	return (`${days_left} days left`)
}