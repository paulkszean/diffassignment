import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { act } from "react-dom/test-utils";
import ApiInputForm from "../components/Form/ApiInputForm";

const testIdForApiInputFormTextField = "cmptTestId-ApiInputForm-TextField";
const testIdForApiInputFormLeftButton = "cmptTestId-ApiInputForm-LeftButton";
const testIdForApiInputFormRighttButton =
  "cmptTestId-ApiInputForm-RighttButton";

afterEach(cleanup);

describe("Checking functionality in api input form", () => {
  const { container } = render(<ApiInputForm />);

  const textField = screen
    .queryByTestId(testIdForApiInputFormTextField)
    ?.querySelector("input");
  const leftSubmitButton = screen
    .queryByTestId(testIdForApiInputFormLeftButton)
    ?.querySelector("input");
  const rightSubmitButton = screen
    .queryByTestId(testIdForApiInputFormRighttButton)
    ?.querySelector("input");

  describe("Creating left data with valid input", () => {
    it(`Should call the onSubmit function`, async () => {
      const mockOnSubmit = jest.fn(() => {
        axios;
      });

      if (textField && leftSubmitButton) {
        await act(async () => {
          fireEvent.change(textField, { target: { value: "left" } });
          fireEvent.click(leftSubmitButton);
        });

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe("Creating right data with valid input", () => {
    it(`Should call the onSubmit function`, async () => {
      const mockOnSubmit = jest.fn(() => {
        axios;
      });

      if (textField && rightSubmitButton) {
        await act(async () => {
          fireEvent.change(textField, { target: { value: "right" } });
          fireEvent.click(rightSubmitButton);
        });

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe("Creating data with invalid input", () => {
    it(`Should prompt for required field`, async () => {
      const textField = screen
        .queryByTestId(testIdForApiInputFormTextField)
        ?.querySelector("input");

      if (textField) {
        await act(async () => {
          fireEvent.change(textField, { target: { value: "" } });
        });
        expect(container.innerHTML).toContain("required");
      }
    });
  });
});
