import { Card, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { compareResultHistoryInterface } from "../../interfaces/interfaces";

interface CompareResultPageface {
  compareResultHistory: compareResultHistoryInterface | null;
}

// Reference : https://stackoverflow.com/questions/61441826/react-highlight-text-between-two-indexes, Credit goes to MrHolal
// Modified the code to suit the current requirement
const highlightText = (text: string, start: number, end: number) => {
  const highlightTextStart = start;
  const highlightTextEnd = end;

  // The part before matched text
  const beforeText = text.slice(0, highlightTextStart);
  // The part to hightlight based on start and end index
  const highlightedText = text.slice(highlightTextStart, highlightTextEnd);
  // the part after matched text
  const afterText = text.slice(highlightTextEnd, text.length);
  
  // Return in JSX elements
  return (
    <Typography component="span">
      {beforeText}
      <strong className="highlightText">{highlightedText}</strong>
      {afterText}
    </Typography>
  );
};

const CompareResultPage: React.FC<CompareResultPageface> = ({
  compareResultHistory,
}) => {
  if (compareResultHistory) {
    const { leftDbDataObject, rightDbDataObject, compareResult } =
      compareResultHistory;

    return (
      <>
        <Paper className="paperDiv">
          <h1>Decoded data</h1>

          <Grid container spacing={2}>
            <Grid item xs>
              <Card className="resultRoot" variant="outlined">
                <CardContent>
                  <Typography>Left json string</Typography>
                  {leftDbDataObject && (
                    <pre>{JSON.stringify(leftDbDataObject, undefined, 5)}</pre>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs>
              <Card className="resultRoot" variant="outlined">
                <CardContent>
                  <Typography>Right json string</Typography>
                  {rightDbDataObject && (
                    <pre>{JSON.stringify(rightDbDataObject, null, "\t")}</pre>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        <Paper className="paperDiv">
          <h1>Result</h1>
          <Card className="resultRoot" variant="outlined">
            <CardContent>
              {leftDbDataObject && (
                <Grid container>
                  <Grid item xs={4}>
                    <Typography>Left object - encoded data string</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography>
                      {compareResult &&
                        highlightText(
                          leftDbDataObject.dataEncodedString,
                          compareResult.initialOffset,
                          compareResult.finalOffset
                        )}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {rightDbDataObject && (
                <Grid container>
                  <Grid item xs={4}>
                    <Typography>Right object - encoded data string</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography>
                      {compareResult &&
                        highlightText(
                          rightDbDataObject.dataEncodedString,
                          compareResult.initialOffset,
                          compareResult.finalOffset
                        )}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {compareResult && (
                <Grid container>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography>Are the base64 binaries the same?</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography>
                        {compareResult.isSame ? "Yes" : "No"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography>
                        Are the base64 binaries the same length?
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography>
                        {compareResult.isSameLength ? "Yes" : "No"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography>Left data length</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography>
                        {compareResult.leftDataLength.toString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography>Right data length</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography>
                        {compareResult.rightDataLength.toString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography>Difference first offset at</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography>
                        {compareResult.initialOffset >= 0
                          ? compareResult.initialOffset.toString()
                          : "NA"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography>Difference final offset at</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography>
                        {compareResult.finalOffset >= 0
                          ? compareResult.finalOffset.toString()
                          : "NA"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography>Difference in length</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography>
                        {compareResult.length >= 0
                          ? compareResult.length.toString()
                          : "NA"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Paper>
      </>
    );
  }
  return (
    <Paper className="paperDiv">
      <h1>Nothing to compare</h1>
    </Paper>
  );
};

export default CompareResultPage;
