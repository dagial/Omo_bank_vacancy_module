import { useEffect } from 'react'
import "../styles/landingPage.style.scss"
import headIcon from '../files/index.jpg'
import Carousel from "../components/Carousel"
import VacantTable from "../components/vaccant-table.component"
import NavBar from '../components/NavBar'
import Footer from '../components/footer.component'
import { useNavigate, redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

const LandingPage=({ isAuthenticated })=>{
    const navigate = useNavigate()
    if(isAuthenticated)
        return navigate('/home')
    return(
        <div className="landingpage">
            <Helmet>
                <title>Omo bank | Recruitment</title>
                <link rel="icon" href={headIcon} />
                <meta name="description" content="Omo bank recruitment site"  />
            </Helmet>
            <NavBar menuItems={[{name: "Home", link: "/", onclick: ""},
                                {name: "About", link: "/about", onclick: ""}, 
                                {name: "FAQs", link: "/faqs"}, 
                                {name: "Register", link: "/register", onclick: ""}, 
                                {name: "Login", link: "/login", onclick: ""}
                                ]} 
            />
            <div className="landing-page-container">
                <Carousel />
                <div className="landingPage-table">
                    <VacantTable />
                </div>
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.omo.isAuthenticated
})
export default connect(mapStateToProps, {})(LandingPage);