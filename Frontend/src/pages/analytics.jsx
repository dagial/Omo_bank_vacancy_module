import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts';
import { line_chart, pie_chart } from '../actions/omo'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Get_date } from '../components/getdate'
import Sidebar from "../components/sidebar"
import NavBar from '../components/NavBar'
import Footer from '../components/footer.component'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'
import "../styles/calendar.scss"

function Analytics({ line_data, pie_data, line_chart, pie_chart, isAuthenticated, user }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  console.log(isAuthenticated)
  useEffect(() => {
    if (isAuthenticated && isAuthenticated===false) {
      navigate('/login')
    }
    if (user) {
      if (user.user_type.toLowerCase() === 'recruit') {
        console.log("running")
        navigate('/home')
      }
    }
    line_chart()
    pie_chart() 
  }, [isAuthenticated]);

  if (line_data) {
    var line_data = line_data.map((item) => ({
      day: Get_date(item.day),
      applications: item.applications,
    }))
  }

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`)
  }

  return (
    <>
      <div className="calendar-container">
        <Helmet>
            <title>Omo bank | Analytics</title>
            <link rel="icon" href={headIcon} />
            <meta name="description" content="Omo bank recruitment site"  />
        </Helmet>
        <NavBar menuItems={[{name: "Home", link: "/home", onclick: ""},
                            {name: "About", link: "/about", onclick: ""}, 
                            {name: "FAQs", link: "/faqs", onclick: ""},
                            {name: "Applications", link: "/applications", onclick: ""}
                            ]} 
          />
        <div className="calendar-body">
          <Sidebar className="sidebar"/>
          <div className="calendar-main-content">
          { line_data ?
            <LineChart width={600} height={300} data={line_data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#8884d8" />
            </LineChart> : <></>
          }
            {
              pie_data && pie_data != '' ?
              <div>
              <PieChart width={400} height={400}>
                <Pie data={pie_data} 
                  dataKey="value" 
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                  onClick={(event, segment) => handleJobClick(pie_data[segment].id)}
                  style={{ cursor: 'pointer'}}
                />
                <Tooltip />
                 <Legend
                  payload={[
                    { value: 'Number of applications per job', type: 'rect', color: '#8884d8', id: 'caption' }
                  ]}
                />
            </PieChart>
            </div> : <h3>No applications submitted to display chart</h3>
            }
          </div>
        </div>
      </div> 
      <Footer />
    </>
  );
}

const mapStateToProps = state => ({
  user: state.omo.user,
  isAuthenticated: state.omo.isAuthenticated,
	line_data: state.omo.line_data,
	pie_data: state.omo.pie_data
})

export default connect(mapStateToProps, { line_chart, pie_chart })(Analytics)