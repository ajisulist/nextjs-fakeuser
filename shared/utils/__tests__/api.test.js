import { get, cleanQueryObj } from "../api";

describe("API Fetcher", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("cleanQueryObj run properly", () => {
    const ret = cleanQueryObj({ test: "val1", test2: "" });
    expect(ret).toStrictEqual({ test: "val1" });
  });

  test("get fetcher with empty queryParams", async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    await get("/api");
    expect(fetch).toBeCalledWith(`${process.env.NEXT_PUBLIC_API_HOST}/api`, {
      method: "GET",
    });
  });

  test("get fetcher queryParams", async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    await get("/api", { test: "val1", test2: "val2" });
    expect(fetch).toBeCalledWith(
      `${process.env.NEXT_PUBLIC_API_HOST}/api?test=val1&test2=val2`,
      {
        method: "GET",
      }
    );
  });
  test("get fetcher with empty string queryParams", async () => {
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
