import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import Axios from "axios";
import { useNavigate } from "react-router";

const Button = ({ setUpdateUI }) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    const config = {
      headers: {
        authorization: token,
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    };
    Axios.post(
      process.env.REACT_APP_API_BASE_URL + "/api/photos/save",
      formData,
      config
    )
      .then((res) => {
        console.log(res.data);
        setUpdateUI(res.data._id);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <label
      className="fixed right-0 bottom-0 m-8 text-md shadow-none"
      htmlFor="file_picker"
    >
      <AiFillPlusCircle />
      <input
        hidden
        type="file"
        name="file_picker"
        id="file_picker"
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
};

export default Button;
