import React from 'react'
import { useNavigate } from 'react-router-dom'

function Page_not_found() {
 const navigate = useNavigate();

  return (
    <>
        <div className="center comm_font not_found_div m_t_4">
            <h1>Opps!</h1>
            <img src="https://www.easydata.nl/wp-content/uploads/2020/01/404-page-3-980x812.jpg" alt="" />
            <h3>WE ARE SORRY, PAGE NOT FOUND</h3>
            <small className='text-center'>THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REEMOVED , EXPIRED OR PROVIDED LINK MIGHT INVALID</small>
            <button className='cursor_pointer' onClick={()=>{navigate('/')}} type='button'> BACK TO SITE </button>
        </div>
    </>
  )
}

export default Page_not_found
