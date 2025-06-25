import React from 'react'
import { useHistory } from 'react-router-dom';

const ViewBirthLinkButton = ({ tenantId, certificateId }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${window.contextPath}/employee/birth/viewbirth/${certificateId}`);
  };

  return (
    <span className="link" onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
      View
    </span>
  );
};

export default ViewBirthLinkButton
