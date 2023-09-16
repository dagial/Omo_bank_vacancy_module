import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import ReCaptcha from 'react-google-recaptcha'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import flags from 'react-phone-number-input/flags'
import Footer from '../components/footer.component'
import SmallNav from '../components/SmallNav'
import '../styles/registry.scss'
import logo from "../files/omo_bank_logo.jpg"
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { signup } from '../actions/omo'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'

function Register({ signup, isAuthenticated, isLoading, error }) {
	const [accountCreated, setAccountCreated] = useState(false)
	const [phone, setPhone] = useState()
	const [registryData, setRegistryData] = useState({
		firstname: "",
		middlename: "",
		lastname: "",
		email: "",
		phone: "",
		password: "",
		confirmpassword: ""
	})
	const captchaRef = useRef(null)
	const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
	const [requirements, setRequirements] = useState({
    rightLength: false,
    rightContent: false,
    rightContentLetter: false,
    passwordsMatch: false
  })
  const [value, setValue] = useState(new Date())
  const [satisfied, setSatisfied] = useState(false)
  const [show, setShow] = useState(false)
  const rightLengthCheck = registryData.password.length >= 8
  const rightContentCheck = /\d/.test(registryData.password)
  const rightContentLetterCheck = /[A-Za-z]/.test(registryData.password)
  const passwordsMatchCheck = registryData.password === registryData.confirmpassword
  useEffect(() => {
		if (isAuthenticated) {
			return navigate('/home')
		}
  }, [isAuthenticated])
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
  }, [registryData.password, registryData.confirmpassword])
	
	function handleChange(event) {
		const {name, value} = event.target
		if(name === 'password' || name === 'confirmpassword')
			setShow(true)
		setRegistryData(prevRegistryData => ({...prevRegistryData, [name]: value}))
	}

	function handleToggle(event) {
    const {checked} = event.target
    setShowPass(checked)
  }

	function handleSubmit(event) {
		event.preventDefault()
		if (satisfied) {
			signup(registryData.firstname, registryData.middlename, registryData.lastname, registryData.email,phone, registryData.password, registryData.confirmpassword)
		}
		if (satisfied && !error) {
			setAccountCreated(true)
		}
	}
	return (
		<>
			<Helmet>
        <title>Omo bank | Register</title>
        <link rel="icon" href={headIcon} />
        <meta name="description" content="Omo bank recruitment site"  />
			  <script src="https://www.recaptcha.net/recaptcha/api.js?render=6LebqHckAAAAACDHS9tGAcE5T93X1TZOQqannFyS" async defer></script>
      </Helmet>
      <div className="reg-container">
				<SmallNav />
				<div className="regbox">
				<Link to="/"><img src={logo} alt="Omo bank logo" /></Link>
				<form className="inputs" onSubmit={handleSubmit}>
				  <div className="reglabel">
				    <input type="text" required id="fname" minLength="2" value={registryData.firstname} placeholder="First name" name="firstname" onFocus={e => {e.target.placeholder=""}} onBlur={e => {e.target.placeholder="First name"}} onChange={handleChange} />
				    <label htmlFor="fname">Given name*</label>
				  </div>
				  <div className="reglabel">
				    <input type="text" required id="mname" minLength="2" value={registryData.middlename} placeholder="Father's name" name="middlename" onFocus={e => {e.target.placeholder=""}} onBlur={e => {e.target.placeholder="Father's name"}} onChange={handleChange} />
				    <label htmlFor="mname">Father's name*</label>
				  </div>
				  <div className="reglabel">
				    <input type="text" required id="lname" minLength="2" value={registryData.lastname} placeholder="Last name" name="lastname" onFocus={e => {e.target.placeholder=""}} onBlur={e => {e.target.placeholder="Grandfather's name"}} onChange={handleChange} />
				    <label htmlFor="lname">Grandfather's name*</label>
				  </div>
				  <div className="reglabel">
				    <input type="email" required id="email" value={registryData.email} placeholder="Email address" name="email" onFocus={e => {e.target.placeholder=""}} onBlur={e => {e.target.placeholder="Email address"}} onChange={handleChange} />
				    <label htmlFor="email">Email*</label>
				  </div>
				  <div className="reglabel">
				  <PhoneInput 
				  style={{width: '40%', height: '30px', marginTop: '5px', marginBottom: '10px'}} 
				  required 
				  placeholder='phone number' 
				  onFocus={e => {e.target.placeholder=""}} 
				  onBlur={e => {e.target.placeholder="Phone number"}} 
				  flags={flags} 
				  defaultCountry='ET' 
				  onChange={setPhone} 
				  value={phone} />
				    <label htmlFor='phone'>Phone number*</label>
				  </div>
				  <div className="reglabel">
				    <input type={showPass ? "text" : "password"} required id="password" value={registryData.password} placeholder="Password" name="password" onFocus={e => {e.target.placeholder=""}} onBlur={e => {e.target.placeholder="Password"}} onChange={handleChange} /> 
				    <label htmlFor="password">Password*</label>
				  </div>
				  <div className="reglabel">
				    <input type={showPass ? "text" : "password"} required id="cpassword" value={registryData.confirmpassword} placeholder="Re-enter password" name="confirmpassword" onFocus={e => {e.target.placeholder=""}} onBlur={e => {e.target.placeholder="Re-enter Password"}} onChange={handleChange} /> 
				    <label htmlFor="cpassword">Confirm password*</label>
				  </div>
				  <p>
            <input
              type="checkbox" 
              id="showPass" 
              name="showPass" 
              checked={showPass} 
              onChange={handleToggle}
            />
            <label htmlFor="showPass"> Show Password</label>
          </p>
				  {show ? <ul style={{ color:'#d93025', listStyle: 'none', alignitems: 'center' }} >
            {!requirements.rightLength ? <li><AiFillCloseCircle  style={{ fontsize: '20' }} /> Password must contain at least 8 characters</li> : <></>}
            {!requirements.rightContent ? <li><AiFillCloseCircle /> Password must contain at least one number</li> : <></>}
            {!requirements.rightContentLetter ? <li><AiFillCloseCircle /> Password must contain at least one letter</li> : <></>}
            {!requirements.passwordsMatch ? <li><AiFillCloseCircle /> Passwords do not match</li> : <></>}
          </ul> : <></>
          }
          <ReCaptcha style={{ marginTop: '10px'}} sitekey='6LebqHckAAAAACDHS9tGAcE5T93X1TZOQqannFyS' ref={captchaRef} />
				  <button className='registry-button'>Register</button>
				</form>
				{isLoading ? <AiOutlineLoading3Quarters className='loading' /> : 
				error ? <p className='error-msg'>{error}</p> : 
				accountCreated ? <p className='success-msg'>Account successfully created!<br />Check your email for activation link</p> : <></>}
				<div className="btmcont">
				  <p>Already have an account? <Link className="link" to="/login">Login here</Link></p>
					</div>
				</div>
			</div>
			<Footer />
    	</>
	)
}

const mapStateToProps = state => ({
  isAuthenticated: state.omo.isAuthenticated,
  isLoading: state.omo.isLoading,
  error: state.omo.error
})
export default connect(mapStateToProps, { signup })(Register)