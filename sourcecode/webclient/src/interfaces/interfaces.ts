// Used for mapping form inputs
interface formValueInterface {
  dateTimeCreated: string;
  usage: string;
  textValue: string;
}

// Used for mapping db object
interface dbDataObjectInterface {
  id?: string;
  formValues: formValueInterface;
  data: string;
  dataEncodedString: string;
}

// Used for mapping the comparision result
interface compareResultInterface {
  isSame: boolean;
  isSameLength: boolean;
  leftDataLength: number;
  rightDataLength: number;
  initialOffset: number;
  finalOffset: number;
  length: number;
}

// Used for mapping the comparision result history
interface compareResultHistoryInterface {
  title: string;
  leftDbDataObject: dbDataObjectInterface;
  rightDbDataObject: dbDataObjectInterface;
  compareResult: compareResultInterface;
}

export type {
  dbDataObjectInterface,
  formValueInterface,
  compareResultInterface,
  compareResultHistoryInterface,
};
