import React, { useState, useEffect } from 'react'
import Footer from '../components/footer.component'
import SmallNav from '../components/SmallNav'
import '../styles/reset.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { reset_password_confirm } from '../actions/omo'
import { connect } from 'react-redux'
import { AiFillCloseCircle } from 'react-icons/ai'

function ConfirmResetPassword({ reset_password_confirm }) {
  const navigate = useNavigate()
  const params = useParams()
  const [requirements, setRequirements] = useState({
    rightLength: false,
    rightContent: false,
    rightContentLetter: false,
    passwordsMatch: false
  })
  const [satisfied, setSatisfied] = useState(false)
  const [show, setShow] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [formData, setFormData] = useState({new_password: "", re_new_password: ""})
  const rightLengthCheck = formData.new_password.length >= 8
  const rightContentCheck = /\d/.test(formData.new_password)
  const rightContentLetterCheck = /[A-Za-z]/.test(formData.new_password)
  const passwordsMatchCheck = formData.new_password === formData.re_new_password

  useEffect(() => {

    if (rightLengthCheck) {
      setRequirements(prevRequirements => ({...prevRequirements, rightLength: true}))
    } else {
      setRequirements(prevRequirements => ({...prevRequirements, rightLength: false}))
    }
    if (rightContentCheck) {
      setRequirements(prevRequirements => ({...prevRequirements, rightContent: true}))
    } else {
      setRequirements(prevRequirements => ({...prevRequirements, rightContent: false}))
    }
    if (rightContentLetterCheck) {
      setRequirements(prevRequirements => ({...prevRequirements, rightContentLetter: true}))
    } else {
      setRequirements(prevRequirements => ({...prevRequirements, rightContentLetter: false}))
    }
    if (passwordsMatchCheck) {
      setRequirements(prevRequirements => ({...prevRequirements, passwordsMatch: true}))
    }
    else {
      setRequirements(prevRequirements => ({...prevRequirements, passwordsMatch: false}))
    }
    if (rightLengthCheck && rightContentCheck && passwordsMatchCheck && rightContentLetterCheck) {
      setSatisfied(true)
    }
  }, [formData])

  function handleChange(event) {
    setShow(true)
    const {name, value} = event.target
    setFormData(prevFormData => ({...prevFormData, [name]: value})) 
  }

  function handleSubmit(event) {
    event.preventDefault()
    const uid = params.uid
    const token = params.token
    if (satisfied) {
      alert("Password Changed Successfully!")
      reset_password_confirm(uid, token, formData.new_password, formData.re_new_password)
      setRequestSent(true)
    }
  }

  if (requestSent)
    return navigate('/login')
  return (
    <div className='reset-container'>
      <Helmet>
          <title>Omo bank | Reset Password</title>
            <link rel="icon" href={headIcon} />
            <meta name="description" content="Omo bank recruitment site"  />
      </Helmet>
      <div className="resetbox">
        <h1>Reset Password</h1>
        <form className="inputs" onSubmit={handleSubmit}>
          <div className="revlabel">
            <input 
              type="password" 
              required 
              id="password" 
              value={formData.new_password} 
              name="new_password" 
              placeholder="New password" 
              onFocus={e => {e.target.placeholder=""}} 
              onBlur={e => {e.target.placeholder="New Password"}} 
              onChange={handleChange} 
            />
            <label htmlFor="password">New Password</label>
          </div>
          <div className="revlabel">
            <input 
              type="password" 
              required 
              id="confPass" 
              value={formData.re_new_password} 
              name="re_new_password" 
              placeholder="Confirm new password" 
              onFocus={e => {e.target.placeholder=""}} 
              onBlur={e => {e.target.placeholder="Confirm New Password"}} 
              onChange={handleChange} 
            />
            <label htmlFor="confPass">Confirm New Password</label>
          </div>
          {show ? <ul style={{ color:'#d93025', listStyle: 'none', alignitems: 'center' }} >
            {!requirements.rightLength ? <li><AiFillCloseCircle  style={{ fontsize: '20' }} /> Password must contain at least 8 characters</li> : <></>}
            {!requirements.rightContent ? <li><AiFillCloseCircle /> Password must contain at least one number</li> : <></>}
            {!requirements.rightContentLetter ? <li><AiFillCloseCircle /> Password must contain at least one letter</li> : <></>}
            {!requirements.passwordsMatch ? <li><AiFillCloseCircle /> Passwords do not match</li> : <></>}
          </ul> : <></>
          }
          <button className='reset-button'>Reset password</button>
        </form>
      </div>
    </div>
  );
}

export default connect(null, { reset_password_confirm })(ConfirmResetPassword)