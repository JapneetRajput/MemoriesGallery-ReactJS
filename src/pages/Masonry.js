import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Grid from "../components/Grid";
import Button from "../components/Button";
import Axios from "axios";
import "../styles/home.css";
import Modal from "../components/Modal";
import { AiFillPlusCircle } from "react-icons/ai";
import TextBox from "../components/TextBox";
import { useNavigate } from "react-router";

const Masonry = () => {
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState("");

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("caption", caption);
    setCaption("");
    setSelectedFile(null);
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
        setIsOpen(false);
        navigate("/masonry");
      })
      .catch((err) => console.log(err));
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  let token = localStorage.getItem("token");
  useEffect(() => {
    Axios.get(process.env.REACT_APP_API_BASE_URL + "/api/photos/", {
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);

  return (
    <>
      <Navbar />
      <div className="pt-24">
        {/* <Grid photos={photos} /> */}
        <div className="colums-4 gap-3 w-[1200px] mx-auto space-y-3 pb-28">
          {photos.map(({ caption, photo, _id }) => (
            <div className="bg-gray-200 break-inside-avoid" key={_id}>
              <img src={`${photo}`} alt="grid_image"></img>
            </div>
          ))}
        </div>
        {/* <Button setUpdateUI={setUpdateUI} /> */}
        <button
          className="fixed right-0 bottom-0 m-8 text-md shadow-none"
          onClick={handleOpenModal}
        >
          <AiFillPlusCircle className="w-12 h-12 sm:w-16 sm:h-16" />
        </button>
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <div className="flex flex-col h-screen mt-6">
            <form onSubmit={handleFormSubmit} className="max-w-md w-full">
              <label className="block mb-4">
                <span className="text-gray-700">Upload File : </span>
                <input
                  type="file"
                  onChange={handleFileInputChange}
                  className="mt-1"
                />
              </label>
              <TextBox
                text="text-md text-black"
                width="w-full"
                height="h-12"
                hint="Caption"
                backgroundColor="bg-white"
                position="left-2 md:left-3 top-2.5"
                border="border-gray border-2"
                span="px-1"
                input="px-3 md:px-4"
                div="mt-8"
                setState={setCaption}
                value={caption}
                type="text"
              />
              <button
                type="submit"
                className="w-4/5 lg:w-1/3 sm:w-1/2 mb-4 text-[#2E0052] hover:text-white border-gray-700 border bg-white hover:bg-[#2E0052] rounded-lg h-12 mt-8"
              >
                Upload
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Masonry;
