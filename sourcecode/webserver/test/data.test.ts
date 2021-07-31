import { isBase64String } from "../src/helper/dataHelper";
import app from "../src/app";

describe("Checking data helper function", () => {
  it("Checking isBase64String : abcdefg", () => {
    expect(isBase64String("abcdefg")).toBe(false);
  });

  it("Checking string : abcdefg12345", () => {
    expect(isBase64String("abcdefg12345")).toBe(true);
  });

  it("Checking string : IJG2dag1s3Seg=", () => {
    expect(isBase64String("IJG2dag1s3Seg=")).toBe(false);
  });
});

const validBase64String = "d2hvIGFyZSB5b3U=";

describe("Checking endpoint services", () => {
  it("Calling left endpoint with invalid base64 binary", async () => {
    const endpointResult = await app.service("api/v1/diff/left").create({
      data: "some random string",
    });
    expect(endpointResult).toContain(
      "Data was not created as it is not a json base64 string"
    );
  });

  it("Calling right endpoint with invalid base64 binary", async () => {
    const endpointResult = await app.service("api/v1/diff/right").create({
      data: "some random string",
    });
    expect(endpointResult).toContain(
      "Data was not created as it is not a json base64 string"
    );
  });

  it("Calling diff endpoint with invalid query", async () => {
    const endpointResult = await app.service("api/v1/diff").find({
      query: { leftData: "invalid string", rightData: validBase64String },
    });
    expect(endpointResult).toContain("Unable");
  });

  it("Calling left endpoint with valid base64 binary", async () => {
    const endpointResult = await app.service("api/v1/diff/left").create({
      data: validBase64String,
    });
    expect(endpointResult).toHaveProperty("_id");
  });

  it("Calling right endpoint with valid base64 binary", async () => {
    const endpointResult = await app.service("api/v1/diff/right").create({
      data: validBase64String,
    });
    expect(endpointResult).toHaveProperty("_id");
  });

  it("Calling diff endpoint with valid query", async () => {
    const endpointResult = await app.service("api/v1/diff").find({
      query: { leftData: validBase64String, rightData: validBase64String },
    });
    expect(endpointResult).toContain("leftDataLength");
    expect(endpointResult).toContain("rightDataLength");
    expect(endpointResult).toContain("initialOffset");
    expect(endpointResult).toContain("finalOffset");
    expect(endpointResult).toContain("length");
  });
});
