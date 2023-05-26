import React from "react";

const Grid = ({ photos }) => {
  return (
    <>
      <h1 className="text-2xl mb-4 font-bold">Our Gallery</h1>
      <div className="grid grid-cols-3 gap-4">
        {photos.map(({ caption, photo, _id }) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              src={`http://localhost:3001/uploads/${photo}`}
              alt=""
              className="w-full"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-purple-500 text-xl mb-2">
                {caption}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
