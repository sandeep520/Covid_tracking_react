import { Button } from "antd";
import React from "react";

const Pagination = (props) => {
  const { postPerPage, totalPosts, currentPage, pageinate, prevPage, nextPage } =
    props;
    // console.log(paginate)
  const pageNumbers = [];

  
const handlePagination=(value)=>{
  console.log("value",value);
  props.pageinate(value)
}
  for (let i = 1; i<= Math.ceil(postPerPage)/3; i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers)

  return (
         
     <div className="pagination justify-content-center">
        {currentPage !== 1 && (
          <li>
            <Button
              style={{ cursor: "pointer", marginRight:' 10px'}}
              type="btn btn-primary"
              onClick={() => prevPage()}
            >
              Previous
            </Button>
          </li>
        )}
        {pageNumbers.map(num => (
          <li className="page-item" key={num}>
            <a
              onClick={()=>handlePagination(num)}
              className="page-link active"
              style={{ cursor: "pointer" }}
            >{num}</a>
          </li>
        ))}
        {pageNumbers.length !== currentPage && (
          <li>
            <Button
              style={{ cursor: "active" }}
              type="btn btn-primary"
              onClick={() => nextPage()}
            >
              Next
            </Button>
          </li>
        )}
      </div> 


      );
    };
    
    export default Pagination;
