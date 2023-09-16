import React from 'react'
import '../styles/404.scss'
import { useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import headIcon from '../files/index.jpg'

export default function NotFound(){
    const navigate = useNavigate()
        setTimeout(() => {navigate(-1)}, 3000)
    return (
       <div className='page'>
            <Helmet>
                <title>404 | Page not found</title>
                <link rel="icon" href={headIcon} />
                <meta name="description" content="Omo bank recruitment site"  />
            </Helmet>
            <h1>404 Error</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.<br />
            You will be redirected to the previous page in a moment.
            </p>
        </div>
    )
}