import { convertDateToEpoch } from ".";

export const transformData = (data, tenantId) => {
  console.log(data, "data");
  let tradeUnits = [];
  if (data?.tradeUnits?.length > 0) {
    data?.tradeUnits?.map((data) => {
      tradeUnits.push({
        tradeType: data?.tradeSubType?.code || null,
        uom: data?.tradeSubType?.uom || null,
        uomValue: Number(data?.uomValue) || null,
      });
    });
  }
  let accessories = [];
  if (data?.accessories?.length > 0) {
    data?.accessories?.map((data) => {
      if (data?.accessoryCategory?.code) {
        accessories.push({
          accessoryCategory: data?.accessoryCategory?.code || null,
          uom: data?.accessoryCategory?.uom || null,
          count: Number(data?.count) || null,
          uomValue: Number(data?.uomValue) || null,
        });
      }
    });
  }
  let owners = [];
  if (data?.owners?.length > 0) {
    data?.owners?.map((data) => {
      let obj = {};
      obj.dob = data?.dob ? convertDateToEpoch(data?.dob) : null;
      if (data?.fatherOrHusbandName) obj.fatherOrHusbandName = data?.fatherOrHusbandName;
      if (data?.gender?.code) obj.gender = data?.gender?.code;
      if (data?.mobileNumber) obj.mobileNumber = Number(data?.mobileNumber);
      if (data?.name) obj.name = !data?.ownershipCategory?.code.includes("INSTITUTIONAL") ? data?.name : "";
      if (data?.permanentAddress) obj.permanentAddress = data?.permanentAddress;
      obj.permanentAddress = obj.permanentAddress ? obj.permanentAddress : null;
      if (data?.relationship) obj.relationship = data?.relationship?.code;
      if (data?.emailId) obj.emailId = data?.emailId;
      if (data?.ownerType?.code) obj.ownerType = data?.ownerType?.code;
      owners.push(obj);
    });
  }
  let LicenseData = {
    action: "INITIATE",
    applicationType: "NEW",
    workflowCode: "NewTL",
    commencementDate: convertDateToEpoch(data?.commencementDate),
    financialYear: data?.financialYear?.code,
    licenseType: data?.licenseType?.code || "PERMANENT",
    tenantId,
    tradeName: data?.tradeName || "",
    wfDocuments: [],
    tradeLicenseDetail: {
      structureType: data?.structureSubType?.code || "",
      subOwnerShipCategory: data?.ownershipCategory?.code || "",
      noOfEmployees: Number(data?.noOfEmployees) || "",
      operationalArea: Number(data?.operationalArea) || "",
      accessories,
      tradeUnits,
      owners,
      channel: "COUNTER",
      additionalDetail: {
        gstNo: data?.gstNo || "",

        // isSameAsPropertyOwner: "true",
        // propertyId: "PG-PT-2025-02-27-003761"
      },
      address: {
        doorNo: data?.doorNo,
        street: data?.street,
        locality: { code: data?.locality.code || null },
        city: data?.city?.code,
        pincode: data?.pincode
      }
    },
  }

  const finalData = {
    Licenses: [
      LicenseData
    ]
  }

  return finalData;
}