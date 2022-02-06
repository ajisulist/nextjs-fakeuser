import { act, renderHook } from "@testing-library/react-hooks";
import useDebouncedState from "../useDebouncedState";

describe("Test useDebouncedState hook", () => {
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
    const { result } = renderHook(() => useDebouncedState("test", 300));
    // real value should be 'test'
    expect(result.current[0]).toBe("test");
    // debounced value should be 'test'
    expect(result.current[2]).toBe("test");

    act(() => {
      // set value to 'test123456'
      result.current[1]("test123456");
    });

    // real value should be 'test123456'
    expect(result.current[0]).toBe("test123456");
    // debouncedState should be still 'test' because it's not passed 300ms yet
    expect(result.current[2]).toBe("test");

    act(() => {
      jest.advanceTimersByTime(100);
    });
    // real value should be 'test123456'
    expect(result.current[0]).toBe("test123456");
    // debouncedState should be still 'test' because it's not passed 300ms yet
    expect(result.current[2]).toBe("test");

    act(() => {
      jest.advanceTimersByTime(200);
    });
    // real value should be 'test123456'
    expect(result.current[0]).toBe("test123456");
    // debouncedState should be still 'test' because it's already passed 300ms
    expect(result.current[2]).toBe("test123456");
  });
});
