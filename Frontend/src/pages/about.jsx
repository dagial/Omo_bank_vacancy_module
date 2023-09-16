import React from 'react'
import '../styles/about.css';

export default function About() {
  return (
    <div className='container'>
        <div>
      <h1 className='title'>About us</h1>
       <div className='content'>
       <p>OMO Bank Recruitment Site has several modules to facilitate the recruitment process.</p>
       <ul>
          <li>Using the client management module, client companies can register and  add vacancy details. </li>
           <li>using the online test module, admin can handle the selection test for job seekers.</li>
           <li>Furthermore, this system has a feature of scheduling interviews and selection tests dates.</li>
           <li>Communication between the applicant and company did by the automated emails.</li>
        </ul>
        <h4 className='last'> Read more</h4>
     
        </div>
        </div>
    </div>
  )
}
