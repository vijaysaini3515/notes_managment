import React,{useState} from "react";
import "./Upload.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('File uploaded successfully:', data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
    toast.success('file upload successfully !', {
      position: toast.POSITION.TOP_RIGHT
  });
  };

  return (
    <>
      <div className="upload_main_container">  
         <div className="upload_input_field">
           <h3 className="text-center">Upload Pdf File</h3>           
           <input class="form-control custom-file-input" type="file" id="formFile" accept=".pdf" onChange={handleFileChange}></input>
           <button onClick={handleFileUpload}>Upload</button>
           <ToastContainer />
        </div>       
    </div>
    </>
  );
};

export default Upload;

