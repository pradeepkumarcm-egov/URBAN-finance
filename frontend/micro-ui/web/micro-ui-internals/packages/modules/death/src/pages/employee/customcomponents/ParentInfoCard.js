import React, { useEffect, useState } from "react";
import {
  Card,
  LabelFieldPair,
  TextInput,
  HeaderComponent,
} from "@egovernments/digit-ui-components";
import { useTranslation } from "react-i18next";

const SpouseDetails = ({ onSelect }) => {
  const { t } = useTranslation();

  const [details, setDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    aadhar: "",
    email: "",
    mobile: "",
  });

  const validations = {
    firstName: {
      required: true,
      pattern: /^[A-Za-z\s]{3,50}$/,
      error: "First Name must be 3-50 characters and only alphabets",
    },
    middleName: {
      required: false,
      pattern: /^[A-Za-z\s]{0,50}$/,
      error: "Middle Name must be up to 50 characters and only alphabets",
    },
    lastName: {
      required: true,
      pattern: /^[A-Za-z\s]{3,50}$/,
      error: "Last Name must be 3-50 characters and only alphabets",
    },
    aadhar: {
      required: false,
      pattern: /^[0-9]{12}$/,
      error: "Aadhar must be a 12-digit number",
    },
    email: {
      required: false,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      error: "Enter a valid email address",
    },
    mobile: {
      required: false,
      pattern: /^[6-9][0-9]{9}$/,
      error: "Enter a valid 10-digit Indian mobile number",
    },
  };

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setDetails(prev => ({ ...prev, [field]: value }));

    const rule = validations[field];
    if (rule?.pattern && !rule.pattern.test(value)) {
      setErrors(prev => ({ ...prev, [field]: rule.error }));
    } else {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  useEffect(() => {
    onSelect?.("SpouseDetails", details);
  }, [details]);

  const renderField = (label, field, type = "text", placeholder) => (
    <LabelFieldPair key={field} inline>
      <label className="label-styles">{t(label)}</label>
      <TextInput
        type={type}
        placeholder={t(placeholder || label)}
        value={details[field]}
        onChange={e => handleChange(field, e.target.value)}
      />
      {errors[field] && (
        <span style={{ color: "red", fontSize: "0.75rem" }}>{errors[field]}</span>
      )}
    </LabelFieldPair>
  );

  return (
    <Card type="secondary" style={{ marginBottom: "1.5rem" }}>
      <HeaderComponent>{t("Spouse Information")}</HeaderComponent>

      {renderField("First Name", "firstName")}
      {renderField("Middle Name", "middleName")}
      {renderField("Last Name", "lastName")}
      {renderField("Aadhar Number", "aadhar", "number")}
      {renderField("Email ID", "email")}
      {renderField("Mobile Number", "mobile", "number")}
    </Card>
  );
};

export default SpouseDetails;
