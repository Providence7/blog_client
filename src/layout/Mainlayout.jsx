import React from 'react'
import Navbar from '../components/Navbar'
import {Outlet} from "react-router-dom"
import Stopper from "../components/Stopper"
import Newsletter from '../routes/NewsLetter'
const Mainlayout = () => {
  return (
    <div className='px-7 md:px-10 lg:px-16
     xl:px-32 2xl:px-64'>
        <Navbar/>
        <Outlet />
        <Newsletter />
        <Stopper />
     
     </div>
  )
}

export default Mainlayout