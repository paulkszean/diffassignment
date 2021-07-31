import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import App from "../App";

const testIdForApiInputForm = "cmptTestId-ApiInputForm";
const testIdForApiInputFormTextField = "cmptTestId-ApiInputForm-TextField";
const testIdForApiInputFormLeftButton = "cmptTestId-ApiInputForm-LeftButton";
const testIdForApiInputFormRighttButton =
  "cmptTestId-ApiInputForm-RighttButton";
const testIdForDataSelectorLeft = "cmptTestId-DataSelector-left";
const testIdForDataSelectorRight = "cmptTestId-DataSelector-right";

afterEach(cleanup);

describe("Checking components in app", () => {
  render(<App />);

  describe("Checking component", () => {
    it(`Should load ${testIdForApiInputForm}`, () => {
      const component = screen.queryAllByTestId(testIdForApiInputForm);
      expect(component).toBeTruthy();
    });

    it(`Should load ${testIdForApiInputFormTextField}`, () => {
      const component = screen.queryAllByTestId(testIdForApiInputFormTextField);
      expect(component).toBeTruthy();
    });

    it(`Should load ${testIdForApiInputFormLeftButton}`, () => {
      const component = screen.queryAllByTestId(
        testIdForApiInputFormLeftButton
      );
      expect(component).toBeTruthy();
    });

    it(`Should load ${testIdForApiInputFormRighttButton}`, () => {
      const component = screen.queryAllByTestId(
        testIdForApiInputFormRighttButton
      );
      expect(component).toBeTruthy();
    });
  });

  describe("Checking component", () => {
    it(`Should load ${testIdForDataSelectorLeft}`, () => {
      const component = screen.queryAllByTestId(testIdForDataSelectorLeft);
      expect(component).toBeTruthy();
    });
  });

  describe("Checking component", () => {
    it(`Should load ${testIdForDataSelectorRight}`, () => {
      const component = screen.queryAllByTestId(testIdForDataSelectorRight);
      expect(component).toBeTruthy();
    });
  });
});
