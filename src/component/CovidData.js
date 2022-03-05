import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "../component/Pagination";

function CovidData() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState("");
  const [click, setClick] = useState(false);
  const [loding, setLoding] = useState(false);

  const [currentPage,setCurrentPage] = useState(1)
  const [postPerPage] = useState(50)
  const [totalPosts, setTotalPosts] = useState(10)

  



  const insert = (index, string, char) => {
    let i,
      str = string,
      date;
    for (i = 0; i < index.length; i++) {
      str = str.substring(0, index[i]) + char + str.substr(index[i]);
      date = str.split("-").reverse().join("-");
    }
    return date;
  };



  useEffect(() => {
    axios
      .get("https://api.covidtracking.com/v1/states/daily.json")
      .then((res) => {
        console.log("data====", res.data);
        console.log(data);
        setData(res.data);
        setLoding(true);
        setTotalPosts(res.data.length)
        setSearchTerm(res.data);
      });
    // .catch(err => console.log(err))
  }, []);

  const searchItem = (e) => {
    setSearchResults(e.target.value);
  };

  const searchData = () => {
    let a = data?.filter((search) =>
      search?.state.toLowerCase().includes(searchResults?.toLowerCase())
    );
    console.log(searchResults);
    setClick(true);
    setSearchTerm([...a]);
    console.log(a);
  };
  console.log(searchTerm);


  const indexLastPosts = currentPage * postPerPage;
  console.log(indexLastPosts)
  const indexFirstPosts = indexLastPosts - postPerPage;
  console.log(indexLastPosts)
  const currentPosts = data.slice(indexFirstPosts,indexLastPosts)
  console.log(currentPosts)

const pageinate=(pageNumber)=>{
  setCurrentPage(pageNumber)
}
  const prevPage = () => setCurrentPage(currentPage - 10)
  const nextPage = () => setCurrentPage(currentPage + 10)

  // const showPagination = () => {
  //   return(
  //     <Pagination
  //     postPerPage={postPerPage}
  //     totalPosts={totalPosts}
  //     currentPage={currentPage}
  //     pageinate={pageinate}
  //     prevPage={prevPage}
  //     nextPage={nextPage}
  //     /> 

  //   )

  // }


  return (
    <>
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "black",
          fontFamily: "cursive",
        }}
      >
        <h1>Covid 19 Status Report</h1>
      </div>

      <div class="input-group" style={{ width: "300px" }}>
        <input
          type="search"
          class="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={searchItem}
        />
        <button
          onClick={searchData}
          type="button"
          class="btn btn-outline-primary"
        >
          search
        </button>
      </div>


      {/* ==============================Search bar =============================================== */}

      {click == true ? (
        <table class="table">
          <thead>
          <tr>
                <th scope="col">Date</th>
                <th scope="col">State</th>
                <th scope="col">Positive Case</th>
                <th scope="col">Negative Case</th>
                <th scope="col">Recovered</th>
                <th scope="col">Panding</th>
                <th scope="col">TotalTestResults</th>
              </tr>
          </thead>
          <tbody>
            {searchTerm?.map((item, i) => {
              console.log(item);
              return (
                <>
                  <tr>
                    <td>{insert([4, 7], item.date.toString(), "-")}</td>
                    <td>{item.state}</td>
                    <td>{item.positive}</td>
                    <td>{item.negative}</td>
                    <th>{item.recovered}</th>
                    <td>{item.pending}</td>
                    <td>{item.totalTestResults}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
// =================================================Search bar ===============================

      ) : (
        <div>
          <table class="table ">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">State</th>
                <th scope="col">Positive Case</th>
                <th scope="col">Negative Case</th>
                <th scope="col">Recovered</th>
                <th scope="col">Panding</th>
                <th scope="col">TotalTestResults</th>
              </tr>
            </thead>
            <tbody>
              {loding ? (
                currentPosts.map((item, i) => {
                  return (
                    <>
                      <tr>
                        <td>{insert([4, 7], item.date.toString(), "-")}</td>
                        <td>{item.state}</td>
                        <td>{item.positive}</td>
                        <td>{item.negative}</td>
                        <th>{item.recovered}</th>
                        <td>{item.pending}</td>
                        <td>{item.totalTestResults}</td>
                      </tr>
                    </>
                  );
                })
                ) : (
                  
                  // ============Loder ====================
                  <div
                  class="d-flex text-center"
                  style={{
                    width: "50%",
                    height: "25%",
                    justifyContent: "center",
                    marginLeft: "500%",
                    marginTop: "200%",
                  }}
                  >
                  <div class="spinner-border"></div>
                </div>
              )}
            </tbody>
          </table>
          <Pagination
      postPerPage={postPerPage}
      totalPosts={totalPosts}
      currentPage={currentPage}
      pageinate={pageinate}
      prevPage={prevPage}
      nextPage={nextPage}
      /> 
        </div>
      )}
    </>
  );
}

export default CovidData;
