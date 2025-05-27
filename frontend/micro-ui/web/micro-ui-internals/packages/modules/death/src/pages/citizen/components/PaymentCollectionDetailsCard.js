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