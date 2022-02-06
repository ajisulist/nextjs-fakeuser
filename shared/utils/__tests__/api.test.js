import { get } from "../api";

describe("Test API fetcher", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("Fetch empty queryParams", async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    await get("/api");
    expect(fetch).toBeCalledWith(`${process.env.NEXT_PUBLIC_API_HOST}/api`, {
      method: "GET",
    });
  });

  test("Fetch with queryParams", async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    await get("/api", { test: "val1", test2: "val2" });
    expect(fetch).toBeCalledWith(
      `${process.env.NEXT_PUBLIC_API_HOST}/api?test=val1&test2=val2`,
      {
        method: "GET",
      }
    );
  });
  test("Fetch with empty string queryParams", async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    await get("/api", { test: "val1", test2: "" });
    expect(fetch).toBeCalledWith(
      `${process.env.NEXT_PUBLIC_API_HOST}/api?test=val1`,
      {
        method: "GET",
      }
    );
  });
});
