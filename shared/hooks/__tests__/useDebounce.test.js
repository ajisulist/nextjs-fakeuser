import { act, renderHook } from "@testing-library/react-hooks";
import useDebounce from "../useDebounce";

describe("Test useDebounce hook", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("Should only change value after spesific milisecond", async () => {
    const { result, rerender } = renderHook((val) => useDebounce(val, 300), {
      initialProps: "test",
    });
    expect(result.current).toBe("test");

    rerender("test123");

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe("test");

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe("test123");
  });
});
