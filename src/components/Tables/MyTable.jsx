import React from 'react'
import {Row,Card,Table,Dropdown,Badge} from 'react-bootstrap'
import { FaCaretDown,FaEdit } from 'react-icons/fa'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { AiOutlineEye } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import './tables.css'
import { BASE_URL } from '../../services/helper'
import {Link } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { changedUserStatus } from '../../services/api'
import PaginationC from '../Pagination/PaginationC'

const MyTable = ({users,deleteCurrentUser,getUsersData,page,setPage,pageCount,paginatePrevious
  ,paginateNext}) => {

 
  const handleStatusChange = async (id,status) =>{
    console.log(id, status)
      try {
        
        const res = await changedUserStatus(id,status)
        if(res.status ==200){
          getUsersData()
          toast.success('Status changed successfully')
        }
      } catch (error) {
        toast.error('oops', error)
      }
  }
 
  return (
    <div className="container">
        <Row>
          <div className="col mt-0">
             <Card className="shadow my-2">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                    <tr className="table-dark">
                      <th>ID</th>
                      <th>Fullname</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Gender</th>
                      <th>Status</th>
                      <th>Profile</th>
                      <th>Action</th>
                    </tr>
                </thead>
                <tbody>
               {
              users.length > 0 ?  users.map((user,index)=>{
                  return (
                    <>
                  <tr key={user._id}>
                  <td>{index+1 + (page - 1) * 5}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.gender}</td>
                  <td className="d-flex align-items-center">
                  <Dropdown className="text-center">
                    <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                     <Badge bg={user.status == "Active" ? "success" :  "danger"}>
                      {user.status} <FaCaretDown/>
                     </Badge>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>handleStatusChange(user._id, "Active")}>Active</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handleStatusChange(user._id, "InActive")}>InActive</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  </td>
                  <td className="img_parent">
                    <img className="img_parent" src={`${BASE_URL}/uploads/${user.profile}`} alt="ash" />
                  </td>
                   <td>
                   <Dropdown className="text-center">
                    <Dropdown.Toggle variant="light" className="action" id="dropdown-basic">
                      <HiOutlineDotsVertical/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link className="link" to={`/profile/${user._id}`}>
                         <AiOutlineEye color='green'/><span className="ml-2">View</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                      <Link className="link" to={`/edit/${user._id}`}>
                        <FaEdit color='blue'/><span className="ml-2">Edit</span>
                      </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <div onClick={()=>deleteCurrentUser(user._id)}>
                         <MdDelete color='tomato'/><span className="ml-2">Delete</span>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                   </td>
                  
                     </tr>  
                    </>
                  )
                }):<div className="no_data text-center">No data found</div>
               }           
                </tbody>

              </Table>
              <PaginationC
              page={page}
              setPage={setPage}
              pageCount={pageCount}
              paginatePrevious={paginatePrevious}
              paginateNext={paginateNext}/> 
             </Card>
          </div>
        </Row>
        
    </div>
  )
}

export default MyTable