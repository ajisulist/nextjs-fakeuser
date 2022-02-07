import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import IndexPage from "../IndexPage";

import mock from "./user.mock.json";

const FIRST_LOAD_URL = `${process.env.NEXT_PUBLIC_API_HOST}/api?page=1&results=10`;
const FILTER_KEYOWRD_LOAD_URL = `${process.env.NEXT_PUBLIC_API_HOST}/api?page=1&results=10&keyword=test`;
const FILTER_KEYOWRD_GENDER_LOAD_URL = `${process.env.NEXT_PUBLIC_API_HOST}/api?page=1&results=10&keyword=test&gender=female`;

const KEYWORD_FIELD = "keywordField";
const GENDER_SELECT_FIELD = "genderField";
const GENDER_DROPDOWN_OPTIONS = "genderOptions";

describe("Index Page", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("initial render should load page 1 and 10 results", async () => {
    fetch.mockResponse(JSON.stringify(mock));
    render(<IndexPage />);

    // first load should only called User API once and only with 'results' and 'page'
    await waitFor(() => expect(fetch).toBeCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(FIRST_LOAD_URL, { method: "GET" });
  });

  test("filtering should load API based on selected filter", async () => {
    fetch.mockResponse(JSON.stringify(mock));
    const { getByTestId, getByText } = render(<IndexPage />);

    // first load should only called User API once and only with 'results' and 'page'
    await waitFor(() => expect(fetch).toBeCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(FIRST_LOAD_URL, { method: "GET" });

    // type 'test' into keyword field
    userEvent.type(getByTestId(KEYWORD_FIELD), "test");

    /** After typing keyword, fetch should be called once again with 'test' as keyword
     *  and not loading API for each character changes. We need to make sure debounce functionality works
     */
    await waitFor(() => expect(fetch).toBeCalledTimes(2));
    expect(fetch).toHaveBeenCalledWith(FILTER_KEYOWRD_LOAD_URL, {
      method: "GET",
    });

    // Select gender by clicking into select field, waiting options to be visible and the click the desired option
    userEvent.click(getByTestId(GENDER_SELECT_FIELD));
    await waitFor(() =>
      expect(getByTestId(GENDER_DROPDOWN_OPTIONS)).toBeVisible()
    );
    userEvent.click(getByText("Female"));

    // After selecting gender, fetch should be called once again with 'female' as keyword
    await waitFor(() => expect(fetch).toBeCalledTimes(3));
    expect(fetch).toHaveBeenCalledWith(FILTER_KEYOWRD_GENDER_LOAD_URL, {
      method: "GET",
    });
  });
});
