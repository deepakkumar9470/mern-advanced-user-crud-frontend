import React,{useState,useEffect} from 'react'
import {Row,Card} from 'react-bootstrap'
import './profile.css'
import {useParams} from 'react-router-dom'
import { getSingleUserById } from '../../services/api'
import { BASE_URL } from '../../services/helper'
import Loader from '../../components/Loader/Loader'
import { FcIphone } from "react-icons/fc";
import { FaMale } from "react-icons/fa";
import { GrUserFemale } from "react-icons/gr";
import { MdOutlineMailOutline,MdLocationOn } from "react-icons/md";


const Profile = () => {
  const [user,setUser] = useState({})
  const [loading,setLoading] = useState(true)
  const {id} = useParams()

  useEffect(() => {
    const getUserById =  async () =>{
         try {
          const res = await getSingleUserById(id)
         console.log(res)
         if(res.status === 200){
          setUser(res.data)
         }
         } catch (error) {
           console.log(error)
         }
    }
     getUserById()
     setTimeout(() => {
      setLoading(false)
     }, 1200);
  }, [id])
  

  return (
    <div className='container'>
      {
        loading ?  <Loader/>
        :
        (
          <Card className='card_profile shadow col-lg-6 mx-auto mt-5'>
        <Card.Body>
          <Row>
            <div className="col">
              <div className="card_profile_stats d-flex justify-content-center">
                <img src={`${BASE_URL}/uploads/${user.profile}`} alt="userpic" />
              </div>
            </div>
          </Row>
          <div className="text-center">
            <h4>{user.firstName + user.lastName}</h4>
            <h5><MdOutlineMailOutline/> &nbsp;<span>{user.email}</span></h5>
            <h5><FcIphone/>&nbsp;<span>{user.mobile}</span></h5>
            <h5><span>{user.gender === "Male" ? <FaMale/> : <GrUserFemale/>} {user.gender}</span></h5>
            <h5><MdLocationOn/>&nbsp;<span>{user.location}</span></h5>
          </div>
        </Card.Body>
      </Card>
        )
      }
    </div>
  )
}

export default Profile