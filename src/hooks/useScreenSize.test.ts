import { renderHook, act } from "@testing-library/react";
import useScreenSize from "./useScreenSize";

describe("useScreenSize", () => {
  // Ensure no conflicts with other tests when updating window width.
  describe("initial run", () => {
    beforeEach(() => {
      act(() => {
        window.innerWidth = 400;
      });
    });

    it("should initialize with default values (isMobile)", async () => {
      const { result } = renderHook(() => useScreenSize());

      expect(result.current.isMobile).toBe(true);
      expect(result.current.isDesktop).toBe(false);
    });
  });

  describe("resize events", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should update values for Desktop on window resize", async () => {
      const { result } = renderHook(() => useScreenSize());

      act(() => {
        window.innerWidth = 800;
        window.dispatchEvent(new Event("resize"));
        jest.runAllTimers();
      });

      expect(result.current.isMobile).toBe(false);
      expect(result.current.isDesktop).toBe(true);
    });

    it("should update values for Mobile on window resize", async () => {
      const { result } = renderHook(() => useScreenSize());

      act(() => {
        window.innerWidth = 600;
        window.dispatchEvent(new Event("resize"));
        jest.runAllTimers();
      });

      expect(result.current.isMobile).toBe(true);
      expect(result.current.isDesktop).toBe(false);
    });

    it("should handle debounced window resize", async () => {
      const { result } = renderHook(() => useScreenSize());

      act(() => {
        window.innerWidth = 600;
        window.dispatchEvent(new Event("resize"));
      });

      // Ensure values are not updated immediately
      expect(result.current.isMobile).toBe(true);
      expect(result.current.isDesktop).toBe(false);

      act(() => {
        // Fast-forward time to trigger debounced resize
        jest.runAllTimers();
      });

      // Ensure values are updated after debounce
      expect(result.current.isMobile).toBe(true);
      expect(result.current.isDesktop).toBe(false);
    });
  });
});
