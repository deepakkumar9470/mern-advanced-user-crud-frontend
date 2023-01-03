import React from 'react'
import {Spinner} from 'react-bootstrap'
const Loader = () => {

  return (
    
    <div className='d-flex align-items-center justify-content-center' 
    style={{width:"100%",height : "50vh" }}>
       <Spinner animation="border" />
    </div>
  )
}

export default Loader