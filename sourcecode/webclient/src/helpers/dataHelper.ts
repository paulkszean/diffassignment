import { dbDataObjectInterface } from "../interfaces/interfaces";

const encode64 = (jsonString: string) => {
  let result = "";
  if (jsonString) {
    result = btoa(jsonString);
  }
  return result;
};

const decode64 = (base64String: string) => {
  let result = "";
  if (base64String) {
    result = atob(base64String);
  }
  return result;
};

// Returns a typed object
const convertDbDataToDataObject = (dbRecord: any) => {
  if (dbRecord) {
    console.log("convertDbDataToDataObject", dbRecord);
    // Decode the data from the db record
    const jsonString = decode64(dbRecord.data);
    // Convert the decoded json string into typed object
    const decodedDataObject: dbDataObjectInterface = JSON.parse(jsonString);
    return decodedDataObject;
  }
  return null;
};

// Returns a typed object list
const convertDbDataToDataObjectList = (data: any) => {
  if (data) {
    let arrayList: dbDataObjectInterface[] = [];
    data.forEach((dbRecord: any) => {
      // Decode the data from the db record
      const jsonString = decode64(dbRecord.data);
      // Convert the decoded json string into the typed object
      const decodedDataObject: dbDataObjectInterface = JSON.parse(jsonString);
      // Add into an array
      arrayList.push({
        id: dbRecord._id,
        formValues: decodedDataObject.formValues,
        data: decodedDataObject.data,
        dataEncodedString: decodedDataObject.dataEncodedString,
      });
    });
    return arrayList;
  }
  return [];
};

export {
  encode64,
  decode64,
  convertDbDataToDataObject,
  convertDbDataToDataObjectList,
};
