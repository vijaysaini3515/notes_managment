import React, { useState, useEffect } from "react";
import "./Pdf.scss";

const Pdf = () => {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/files",{
      headers:{
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, []);

  const handleViewFile = (file) => {
    const pdfData = atob(file.data);
    const byteArray = new Uint8Array(pdfData.length);

    for (let i = 0; i < pdfData.length; i++) {
      byteArray[i] = pdfData.charCodeAt(i);
    }

    const pdfBlob = new Blob([byteArray], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");
  };

  const handleDownloadFile = (file) => {
    const pdfData = atob(file.data);
    const byteArray = new Uint8Array(pdfData.length);

    for (let i = 0; i < pdfData.length; i++) {
      byteArray[i] = pdfData.charCodeAt(i);
    }

    const pdfBlob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.click();
  };

  //search_api_fetch
  
  const handleSearch =async(e)=>{
      let key= e.target.value;
      if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`);
        result = await result.json();
        if(result){
            setFiles(result);
          }
      }else{
        files()
      }
      
  }

  return (
    <>
      <div className="pdf_main_container">
      <div className="search">
        <input type="search" className="searchInput" placeholder="Search Topic-->" onChange={handleSearch}/>
        <i class="fa-brands fa-searchengin searchIcon"></i>
      </div>
        {files.length>0? files.map((file, index) => (
          <div className="card_container" key={index}>
               <div className="card-body">
                 <div className="card-title">{file.name}</div>
                  <button className="view_button" onClick={() => handleViewFile(file)}>View</button>
                  <button className="download_button" onClick={() => handleDownloadFile(file)}>Download</button>               
               </div>
          </div>
        )):
        <h1>Related Pdf Not Found</h1>
        }
      </div>
    </>
  );
};

export default Pdf;
