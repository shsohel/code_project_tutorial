import React, { useState } from "react";
// .......................................
import errorImage from "@custom-assets/images/avatars/avatar-blank.png";
import axios from "axios";
// ........................................

const ErrorImage = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const replaceErrorImage = (error) => {
    error.target.src = errorImage;
  };

  const handleImage = (e) => {
    const { files } = e.target;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setFile(file);
  };

  const handleFileUpload = () => {
    const uploadFileApi = "https://localhost:5000/api/upload";

    const formData = new FormData();
    formData.append("File", file, file.name);

    axios
      .post(uploadFileApi, formData)
      .then((response) => {
        if (response.status === 200) {
          const responseFileUrl = response.data;
          setFileUrl(responseFileUrl);
          alert("The file has been uploaded successfully ");
        }
      })
      .catch((error) => {
        alert(`${error.message}`);
      });
  };
  const handleFileRemove = () => {
    const fileId = '356565584555'
    const deleteFileApi = `"https://localhost:5000/api/upload/${fileId}"`;
    axios
      .delete(deleteFileApi)
      .then((response) => {
        if (response.status === 200) {
          const responseFileUrl = response.data;
          setFileUrl(responseFileUrl);
          alert("The file has been deleted successfully ");
        }
      })
      .catch((error) => {
        alert(`${error.message}`);
      });
  };

  return (
    <>
      <div>
        <img
          id="avatar"
          name="user-image"
          value={fileUrl}
          onChange={(e) => {
            handleImage(e);
          }}
          onError={replaceErrorImage}
        />
      </div>
      <div>
        <button
          onClick={() => {
            handleFileUpload();
          }}
        >
          Upload
        </button>
        <button
          onClick={() => {
            handleFileRemove();
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ErrorImage;
