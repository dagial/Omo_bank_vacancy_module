import React, { useState, useEffect } from 'react'
import Footer from '../components/footer.component'
import SmallNav from '../components/SmallNav'
import '../styles/loginbox.scss'
import logo from "../files/omo_bank_logo.jpg"
import { Link, useNavigate, redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, checkAuthenticated } from '../actions/omo'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function Login({ login, isAuthenticated, isLoading, error }) {
  const [formData, setFormData] = useState({user: "", password: ""})
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  if (isAuthenticated) {
    return navigate('/home')
  }
  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => ({...prevFormData, [name]: value}))
  }
  function handleToggle(event) {
    const {checked} = event.target
    setShowPass(checked)
  }
  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData)
    login(formData.user, formData.password)
  }

  
  return (
    <>
      <Helmet>
        <title>Omo bank | Login</title>
        <link rel="icon" href={headIcon} />
        <meta name="description" content="Omo bank recruitment site"  />
      </Helmet>
      <div className="login-container">
        <SmallNav />
        <div className="box">
          <Link to="/"><img src={logo} alt="Omo bank logo" /></Link>
          <form className="inputs" onSubmit={handleSubmit}>
            <div className="revlabel">
              <input 
                type="email" 
                required 
                id="user" 
                value={formData.user} 
                name="user" 
                placeholder="Email address" 
                onFocus={e => {e.target.placeholder=""}} 
                onBlur={e => {e.target.placeholder="Email address"}} 
                onChange={handleChange} 
              />
              <label htmlFor="user">Email</label>
            </div>
            <div className="revlabel">
              <input 
                type={showPass ? "text" : "password"} 
                required id="password" 
                value={formData.password} 
                name="password" 
                placeholder="Password" 
                onFocus={e => {e.target.placeholder=""}} 
                onBlur={e => {e.target.placeholder="Password"}} 
                onChange={handleChange} 
              /> 
              <label htmlFor="password">Password</label>
            </div>
            <div>
              <input
                type="checkbox" 
                id="showPass" 
                name="showPass" 
                checked={showPass} 
                onChange={handleToggle}
              />
              <label htmlFor="showPass"> Show Password</label>
            </div>
            <button className='login-button'>Login</button>
          </form>
          {isLoading ? <AiOutlineLoading3Quarters className='loading' /> : error ? <p className='error-msg'>{error}</p> : <></>}
          <div className="btmcont">
            <div className='link-cont'>{`Don't have an account? `}<Link className="link" to="/register">Register here</Link></div>
            <div className='link-cont'>Forgot password? <Link className="link" to="/reset-password">Reset password</Link></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.omo.isAuthenticated,
  isLoading: state.omo.isLoading,
  error: state.omo.error
})
export default connect(mapStateToProps, { login })(Login)