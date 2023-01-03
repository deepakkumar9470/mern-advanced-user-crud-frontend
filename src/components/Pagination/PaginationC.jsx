import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginationC = ({page,setPage,pageCount,paginatePrevious,paginateNext}) => 
  {
    
    return (
   <>
     {
    pageCount > 0 ? (
      <div className='pagination d-flex justify-content-end mx-4'>
      
      <Pagination>
        <Pagination.Prev onClick={()=>paginatePrevious()} />
        {
          Array(pageCount).fill(null).map((element,index)=>{
            return (
              <>
                <Pagination.Item active={page === index+1 ? true  :false} onClick={()=>setPage(index+1)}>{index+1}</Pagination.Item>
              </>
            )
          })
        }
        <Pagination.Next onClick={()=>paginateNext()} />
      </Pagination>

    </div>
    ) : ""
   }
   </>
  )
}

export default PaginationC