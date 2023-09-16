import React, { useState } from 'react'
import SmallNav from '../components/SmallNav'
import '../styles/reset.scss'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import { activation } from '../actions/omo'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function Activate({ activation, isAuthenticated }) {
  const [verified, setVerified] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  if (isAuthenticated) {
    return navigate('/home')
  }

  function verify_account() {
    const uid = params.uid
    const token = params.token
    activation(uid, token)
    setVerified(true)
  }
  if (verified) {
    return navigate('/login')
  }
  return (
    <div className="reset-container">
      <Helmet>
        <title>Omo bank | Activate account</title>
        <link rel="icon" href={headIcon} />
        <meta name="description" content="Omo bank recruitment site"  />
      </Helmet>
      <div className="resetbox">
        <h1>Activate account</h1>
          <button onClick={verify_account} className='reset-button'>Verify</button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.omo.isAuthenticated
})
export default connect(null, { activation })(Activate)