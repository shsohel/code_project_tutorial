//Import Section or Dependency

import { useState } from "react";
// .......................................
import errorImage from "../../assets/images/avatars/avatar-blank.png";
import axios from "axios";
// ........................................

const UploadComponent = () => {
  //File Url State
  const [fileUrl, setFileUrl] = useState("");

  ///Replace function work when file url not found to replacing a image
  const replaceErrorImage = (error) => {
    error.target.src = errorImage;
  };

  ///handleFileUpload function work when file upload will progress through the api
  const handleFileUpload = (file) => {
    const uploadFileApi = "https://localhost:5000/api/upload";

    const formData = new FormData();
    formData.append("File", file, file.name);

    axios
      .post(uploadFileApi, formData)
      .then((response) => {
        if (response.status === 200) {
          const responseFileUrl = response.data;
          //Set URL to show the file instead of uploading completely
          setFileUrl(responseFileUrl);

          //Show Alert Message if File Upload Success
          alert("The file has been uploaded successfully ");
        }
      })
      .catch((error) => {
        ///If have an error
        alert(`${error.message}`);
      });
  };

  ///File Upload first Action
  const handleImageChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    //Create URL to show the file instead of uploading it directly
    const url = URL.createObjectURL(file);

    ///Set Local Url before Upload Start
    setFileUrl(url);

    //API File Upload Action
    handleFileUpload(file);
  };

  ///handleFileRemove function work when you want to remove a specific file through the api
  const handleFileRemove = () => {
    const fileId = "356565584555";
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
          src={fileUrl}
          onError={replaceErrorImage}
        />
      </div>
      <div>
        <div>
          <input id="file-upload-id" type="file" accept="image/*" hidden />
          <label
            htmlFor="file-upload-id"
            onClick={(e) => {
              handleImageChange(e);
            }}
          >
            Upload
          </label>
        </div>

        <div>
          <button
            onClick={() => {
              handleFileRemove();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default UploadComponent;
