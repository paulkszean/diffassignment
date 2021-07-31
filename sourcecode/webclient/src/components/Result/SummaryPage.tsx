import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getApiV1Url } from "../../helpers/urlHelper";
import {
  compareResultHistoryInterface,
  compareResultInterface,
  dbDataObjectInterface,
} from "../../interfaces/interfaces";
import DataSelector from "../Selector/DataSelector";
import CompareResultPage from "./CompareResultPage";

interface SummaryInterface {}

const SummaryPage: React.FC<SummaryInterface> = () => {
  const [leftData, setLeftData] = useState<dbDataObjectInterface | null>(null);
  const [rightData, setRightData] = useState<dbDataObjectInterface | null>(
    null
  );
  const [compareResultHistory, setCompareResultHistory] =
    useState<compareResultHistoryInterface | null>(null);
  const [compareResultHistoryList, setCompareResultHistoryList] = useState<
    compareResultHistoryInterface[]
  >([]);

  // Listens for ui event
  useEffect(() => {
    let isLoaded = true;
    if (isLoaded) {
      console.log(leftData, rightData);
      if (leftData && rightData) {
        // Determine url to call
        const urlToCall = `${getApiV1Url}/diff`;

        // Use promise to create post task
        const promise1 = axios.get(urlToCall, {
          params: {
            leftData: leftData.dataEncodedString,
            rightData: rightData.dataEncodedString,
          },
        });

        // Catch promise response
        Promise.all([promise1]).then((values: any) => {
          // Only expects 1 data created successfully
          if (values && values.length === 1) {
            const compareResult: compareResultInterface = JSON.parse(
              values[0].data
            );

            // Create typed object
            const compareResultHistory: compareResultHistoryInterface = {
              title: `comparision_${new Date()}`,
              leftDbDataObject: leftData,
              rightDbDataObject: rightData,
              compareResult,
            };

            // Update the compare result history and list
            if (compareResultHistory) {
              setCompareResultHistory(compareResultHistory);
              setCompareResultHistoryList((compareResultHistoryList) => [
                ...compareResultHistoryList,
                compareResultHistory,
              ]);
            }
          }
        });
      }
    }
    return () => {
      isLoaded = false;
    };
  }, [leftData, rightData]);

  const doComparision = (event: any) => {
    const jsonObject: dbDataObjectInterface = JSON.parse(event.target.value);
    if (jsonObject.formValues.usage === "left") {
      setLeftData(jsonObject);
    }
    if (jsonObject.formValues.usage === "right") {
      setRightData(jsonObject);
    }
  };

  // Load the compare history from the selected history list
  const loadCompareResultHistory = (
    compareResultHistory: compareResultHistoryInterface
  ) => {
    if (compareResultHistory) {
      setCompareResultHistory(compareResultHistory);
    }
  };

  return (
    <Grid container>
      <Grid container>
        <Grid item xs={4}>
          <Paper className="paperDiv">
            <h1>Left object selector</h1>
            <DataSelector usage="left" doComparision={doComparision} />
            <h1>Right object selector</h1>
            <DataSelector usage="right" doComparision={doComparision} />
          </Paper>
          <Paper className="paperDiv">
            <h1>Selection history</h1>
            <List dense>
              {compareResultHistoryList &&
                compareResultHistoryList.map(
                  (item: compareResultHistoryInterface, index: any) => (
                    <ListItem key={`${item.title}-${index}`}>
                      <ListItemText primary={item.title} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="view"
                          onClick={() => {
                            loadCompareResultHistory(item);
                          }}
                        >
                          <Search />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <CompareResultPage compareResultHistory={compareResultHistory} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SummaryPage;
