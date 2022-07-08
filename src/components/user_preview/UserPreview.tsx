import React from "react";
import "./UserPreview.css";
import ProfilePic from "../../assets/img/general/pfp.png";

interface UserPreviewProps {
  name: string;
  position?: string;
}

const UserPreview: React.FC<UserPreviewProps> = ({ name }) => {
  return (
    <div className="user-preview">
      <div className="profile-picture">
        <img src={ProfilePic} alt="user-profile" />
      </div>
      <div className="user-name">{name}</div>
    </div>
  );
};

export default UserPreview;
