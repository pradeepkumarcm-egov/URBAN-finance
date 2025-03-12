import React from "react";
import { Card, CardLabel, CardText, StatusTable, Row } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const TLViewUnit = (props) => {
  const { index, values, count_prefix } = props;
  const { t } = useTranslation();

  return (
    <div className="tl-container">
      <Card className="tl-row-card">
        <div className="unit-header">
          <h1>
            <strong>
              {count_prefix} {index}
            </strong>{" "}
          </h1>
        </div>
        <StatusTable>
          {values &&
            values.length > 0 &&
            values.map((item, idx) => (
              <Row key={idx} label={t(item?.title)} text={t(item?.value)} last={idx === values.length - 1} className="border-none" />
            ))}
        </StatusTable>
      </Card>
    </div>
  );
};

export default TLViewUnit;
