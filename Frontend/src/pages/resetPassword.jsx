import React, { useState } from 'react'
import Footer from '../components/footer.component'
import SmallNav from '../components/SmallNav'
import '../styles/reset.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { connect } from 'react-redux'
import { reset_password } from '../actions/omo'

function ResetPassword({ reset_password }) {
  const [requestSent, setRequestSent] = useState(false)
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
   
  function handleChange(event) {
    const {value} = event.target
    setEmail(value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    reset_password(email)
    setRequestSent(true)
  }
  if (requestSent) {
    return navigate(-1)
  }
  return (
    <div className='reset-container'>
      <Helmet>
          <title>Omo bank | Reset Password</title>
            <link rel="icon" href={headIcon} />
            <meta name="description" content="Omo bank recruitment site"  />
      </Helmet>
      <div className="resetbox">
        <h1>Request Password Reset</h1>
        <form className="inputs" onSubmit={handleSubmit}>
          <div className="revlabel">
            <input 
              type="email"
              required
              id="email"
              value={email}
              name="email"
              placeholder="Your Email"
              onFocus={e => {e.target.placeholder=""}}
              onBlur={e => {e.target.placeholder="Your Email"}}
              onChange={handleChange} 
            />
            <label htmlFor="email">Email</label>
          </div>
          <button className='reset-button'>Reset password</button>
        </form>
      </div>
      {requestSent ? <center><p>Check your email for the password reset link</p></center> : <></>}
    </div>
  );
}

export default connect(null, { reset_password })(ResetPassword)