import React,{useState,useEffect} from 'react'
import {Row,Card,Form,Button} from 'react-bootstrap'
import Select from 'react-select'
import './edit.css'
import { editUser, getSingleUserById } from '../../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../services/helper'
import { toast } from 'react-hot-toast'
import { FcCheckmark } from "react-icons/fc";

const Edit = () => {
 const [inputs,setInputs] = useState({
    firstName : "",
    lastName: "",
    email:"",
    mobile:"",
    gender:"",
    location:"",
 })
 const options = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'InActive' }
]

const [status,setStatus] = useState("Active") 
const [image,setImage] = useState("")
const[imageData,setImgData] = useState("")
const [preview,setPreview] = useState("")
const navigate = useNavigate()


  const {id} = useParams()
  
  useEffect(() => {
    const getUserById =  async () =>{
         try {
          const res = await getSingleUserById(id)
         if(res.status === 200){
          setInputs(res.data)
          setStatus(res.data.status)
          setImgData(res.data.profile)
         }
         } catch (error) {
           console.log(error)
         }
    }
     getUserById()

  }, [id])

 const handleInputChange = (e) =>{
  const {name,value}  = e.target
  setInputs({...inputs, [name] :value})

 }

 const handleStatusChange = (e) =>{
  setStatus(e.value)
 }

 const handleFileChange = (e) =>{
    setImage(e.target.files[0])
 }

 useEffect(() => {
  if(image){
    setImgData("")
    setPreview(URL.createObjectURL(image))
  } 
 }, [image])

 const handleSubmit = async (e) =>{
  e.preventDefault()
  const {firstName,lastName,email,mobile,gender,location} = inputs
  if(firstName === ""){
    toast.error('First name is required')
  }else if(lastName === ""){
    toast.error('Last name is required') 
  }else if(email === ""){
    toast.error('Email is required')
    
  }else if(!email.includes("@")){
    toast.error('Invalid email!')
  }else if(mobile === ""){
    toast.error('Mobile no  is required')
  }else if(mobile.length > 10){
    toast.error('Enter valid mobile no')
  }else if(gender === ""){
    toast.error('Gender is required')
  }else if(location === ""){
    toast.error('Location is required')
  }else if(status === ""){
    toast.error('Status is required')
  }else{
       
    try {
      const formdata = new FormData()
      formdata.append('firstName', firstName)
      formdata.append('lastName', lastName)
      formdata.append('email', email)
      formdata.append('mobile', mobile)
      formdata.append('gender', gender)
      formdata.append('location', location)
      formdata.append('status', status)
      formdata.append('user_profile', image || imageData)

      const config = {
        "Content-Type" : "multipart/form-data"
      } 
       await editUser(id,formdata,config)
      toast.success('User updated Successfully', {icon : <FcCheckmark/>})
      navigate('/') 
    } catch (error) {
      toast.error(error)
    }
    
  }
 }
 
  return (
   <>
      <div className='container'>
         <h2 className='text-center mt-3 mb-3'>Edit Your Details</h2>
         <Card className='shadow mt-3 p-3'>
          
           <div className="profile_div text-center">
            <img src={image ? preview : `${BASE_URL}/uploads/${imageData}` } alt="profileimage" />            
          </div>  
         <Form>
          <Row>
            <Form.Group className='col-lg-6 mb-3'>
              <Form.Label>First name</Form.Label>
              <Form.Control onChange={handleInputChange} value={inputs.firstName}  type="text" name="firstName" placeholder="Enter First name"/>
            </Form.Group>

            <Form.Group className='col-lg-6 mb-3'>
              <Form.Label>Last name</Form.Label>
              <Form.Control onChange={handleInputChange} value={inputs.lastName}  type="text" name="lastName" placeholder="Enter Last name"/>
            </Form.Group>

            <Form.Group className='col-lg-6 mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={handleInputChange} value={inputs.email}  type="text" name="email" placeholder="Enter email"/>
            </Form.Group>
            <Form.Group className='col-lg-6 mb-3'>
              <Form.Label>Mobile</Form.Label>
              <Form.Control onChange={handleInputChange} value={inputs.mobile} maxLength={10}  type="number" name="mobile" placeholder="Enter mobile"/>
            </Form.Group>
            <Form.Group className='col-lg-6 mb-3'>
              <Form.Label>Select Gender</Form.Label>
              <Form.Check  
                type={`radio`} 
                name={`gender` }
                label={`Male`}
                checked={inputs.gender === "Male" ? true : false}
                value={`Male`}
                onChange={handleInputChange}
                />
                 <Form.Check  
                type={`radio`} 
                name={`gender` }
                label={`Female`}
                checked={inputs.gender === "Female" ? true : false}
                value={`Female`}
                onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className='col-lg-6 mb-3'>
              <Form.Label>Select Status</Form.Label>
              <Select options={options} defaultInputValue={status}  onChange={handleStatusChange}/>
            </Form.Group>
            <Form.Group className='col-lg-6 mb-3'>
              <Form.Label>Select Pic</Form.Label>
              <Form.Control type="file" name="user_profile" onChange={handleFileChange}/>
            </Form.Group>
            <Form.Group className='col-lg-6 mb-3'>
              <Form.Label>Your Location</Form.Label>
              <Form.Control onChange={handleInputChange} value={inputs.location} 
              type="text" name="location" placeholder="Enter your location"/>
            </Form.Group>
            <Button variant="success" type="submit" onClick={handleSubmit}>Edit</Button>

          </Row>
         </Form>
         </Card>
        </div>
   </>
  )
}

export default Edit