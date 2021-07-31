import { resultInterface } from '../interfaces/interface';

// PAULK : This function checks if the data is a base64 string
const isBase64String: any = (base64String: string) => {
  try {
    return (
      Buffer.from(base64String, 'base64').toString('base64') === base64String
    );
  } catch (err) {
    return false;
  }
};

// doComparision()
// > Check the base64 binary of the left and right data
//    > same = return
//    > not same = check length and the differences in the base64 binary data

const doComparision: any = (leftData: string, rightData: string) => {
  let result: resultInterface | null = null;
  let initialOffset = -1; // Not set yet
  let finalOffset = -1; // Not set yet
  const length = -1; // Not set yet

  // Same base64 binary data
  if (leftData === rightData) {
    result = {
      isSame: true,
      isSameLength: true,
      leftDataLength: leftData.length,
      rightDataLength: rightData.length,
      initialOffset: 0,
      finalOffset: 0,
      length: 0,
    };
  } else {
    // Same base64 binary data length
    if (leftData.length === rightData.length) {
      // Check char of the base64 binary data
      for (let index = 0; index < leftData.length; index++) {
        if (leftData[index] != rightData[index]) {
          // Set the initial offset if not set before
          if (initialOffset == -1) initialOffset = index;
        } else {
          // Set the final offset if not set and intialOffset has been increased
          if (initialOffset >= 0 && finalOffset == -1) finalOffset = index;
        }
      }
      result = {
        isSame: false,
        isSameLength: true,
        leftDataLength: leftData.length,
        rightDataLength: rightData.length,
        initialOffset,
        finalOffset,
        length: finalOffset - initialOffset,
      };
    }
    // Not same base64 binary data length
    else if (leftData.length !== rightData.length) {
      result = {
        isSame: false,
        isSameLength: false,
        leftDataLength: leftData.length,
        rightDataLength: rightData.length,
        initialOffset,
        finalOffset,
        length,
      };
    }
  }
  return result;
};

export { isBase64String, doComparision };
