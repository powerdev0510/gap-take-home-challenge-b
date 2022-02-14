import React from "react";

export default function Card({ image }) {
  return (
    <div className="card">
      <div className="card-content">
        <img className="image" src={image.imageUrl} alt="" />
        <div className="image-info">
          <i className="fas fa-thumbs-up"></i>
          <span className="likes">{image.likes}</span>
        </div>
      </div>
    </div>
  );
}
