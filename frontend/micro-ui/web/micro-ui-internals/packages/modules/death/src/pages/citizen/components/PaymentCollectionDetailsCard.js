// import { Button, Card, SummaryCard, Tag } from "@egovernments/digit-ui-components";
// import React from "react";
// import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom";

// const PaymentCollectionDetailsCard = () => {

//   return (
//     <Card style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
//       <SummaryCard
//         asSeperateCards
//         className=""
//         header="Heading"
//         layout={1}
//         sections={[
//             {
//             cardType: 'primary',
//             fieldPairs: [
//                 {
//                 inline: true,
//                 label: 'Name',
//                 type: 'text',
//                 value: 'John Doe'
//                 },
//                 {
//                 inline: true,
//                 label: 'Age',
//                 value: '28'
//                 },
//                 {
//                 inline: true,
//                 label: 'Profile Picture',
//                 type: 'image',
//                 value: {
//                     alt: 'Profile',
//                     height: '50px',
//                     src: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
//                     width: '50px'
//                 }
//                 }
//             ],
//             header: 'Personal Information',
//             subHeader: 'Basic details'
//             },

//         ]}
//         style={{}}
//         subHeader="Subheading"
//         type="primary"
//         />
//     </Card>
//   );
// };

// export default PaymentCollectionDetailsCard;


import { Card } from "@egovernments/digit-ui-components";
import React from "react";
import { useTranslation } from "react-i18next";

const PaymentCollectionDetailsCard = () => {
  const { t } = useTranslation();

  return (
    <Card style={{ 
      marginTop: "2rem", 
      padding: "16px",
      fontSize: "16px" // Base font size
    }}>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ 
          margin: "0 0 16px 0",
          fontSize: "1.5rem",
          fontWeight: "600"
        }}>Fee Estimate</h2>
        
        {/* Fee items table */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "8px",
          marginBottom: "16px",
          fontSize: "1.1rem"
        }}>
          <span>Death Certificate Fee</span>
          <span style={{ textAlign: "right" }}>50</span>
        </div>
        
        {/* Total Amount section */}
        <div style={{ 
          textAlign: "center",
          marginBottom: "16px",
          borderTop: "1px solid #f0f0f0",
          paddingTop: "16px"
        }}>
          <h3 style={{ 
            margin: 0,
            fontSize: "1.2rem",
            fontWeight: "500"
          }}>Total Amount</h3>
          <h2 style={{ 
            margin: "8px 0 0 0",
            fontSize: "1.8rem",
            fontWeight: "600"
          }}>Rs 50</h2>
        </div>
      </div>
    </Card>
  );
};

export default PaymentCollectionDetailsCard;