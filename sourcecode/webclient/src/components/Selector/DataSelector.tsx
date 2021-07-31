import { FormControl, Grid, InputLabel, Select } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import feathersClientApp from "../../feathersClientApp";
import {
  convertDbDataToDataObject,
  convertDbDataToDataObjectList,
} from "../../helpers/dataHelper";
import { dbDataObjectInterface } from "../../interfaces/interfaces";

interface DataSelectorInterface {
  usage: string;
  doComparision: (event: any) => any;
}

const DataSelector: React.FC<DataSelectorInterface> = ({
  usage,
  doComparision,
}) => {
  const [dataList, setDataList] = useState<dbDataObjectInterface[]>([]);

  // A hook to waits for the data to return from webserver
  const getDataList = useCallback(() => {
    feathersClientApp
      .service(`api/v1/diff/${usage}`)
      .find()
      .then((response: any) => {
        // Construct the left/right data object list
        const decodedDataList: dbDataObjectInterface[] =
          convertDbDataToDataObjectList(response.data);
        setDataList(decodedDataList);
      });
  }, [usage]);

  useEffect(() => {
    // To prevent component memory leak
    let isLoaded = true;

    if (isLoaded) {
      // Load the left/right data object list
      getDataList();
    }

    return () => {
      isLoaded = false; // Component unloaded
    };
  }, [getDataList, dataList]);

  // Listens for left/right data object being created
  useEffect(() => {
    // To prevent component memory leak
    let isLoaded = true;

    if (isLoaded) {
      // Listens to the created event
      feathersClientApp
        .service(`api/v1/diff/${usage}`)
        .on("created", (response: any) => {
          // Clone the existing data object list
          const clondedDecodedDataList: dbDataObjectInterface[] = [...dataList];
          // Convert into dbDataObject
          const dbDataObject: dbDataObjectInterface | null =
            convertDbDataToDataObject(response);
          if (dbDataObject) {
            // Update the ui display selection data object list
            clondedDecodedDataList.push(dbDataObject);
            // Update the state
            setDataList(clondedDecodedDataList);
          }
        });
    }

    return () => {
      isLoaded = false; // Component unloaded
    };
  }, [usage, dataList]);

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel htmlFor="dataObject-required">
          Select a data object to compare
        </InputLabel>
        <Select
          native
          //   value={age}
          onChange={doComparision}
          name="dataobject"
          inputProps={{
            id: "dataObject-required",
            "data-testid": `cmptTestId-DataSelector-${usage}`,
          }}
        >
          <option aria-label="None" value="" />
          {dataList &&
            dataList.map((item: dbDataObjectInterface, index: any) => (
              <option
                key={`dataObject-${usage}-${index}`}
                value={JSON.stringify(item)}
              >
                {`${item.dataEncodedString} ${item.formValues.textValue}`}
              </option>
            ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default DataSelector;
