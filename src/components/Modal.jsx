import React from "react";
import crossIcon from "../assets/crossIcon.svg";

const Modal = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 sm:left-1/3 sm:w-1/3 h-full bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-[#fffefe] rounded-lg shadow-lg p-6 w-full h-2/5 m-4 border-black border">
        <h1 className="text-lg">Upload Image</h1>
        <button
          className="absolute top-6 right-6 shadow-none"
          onClick={handleClose}
        >
          <img src={crossIcon} alt="close" className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
