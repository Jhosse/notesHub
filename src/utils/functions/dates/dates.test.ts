import { dateFormatting } from ".";

describe("dates", () => {
  describe("dateFormatting", () => {
    it('formats a date string as "Month Day, Year"', () => {
      const date = "2023-11-02T13:18:32.993Z";
      const result = dateFormatting(date);

      expect(result).toEqual("November 02, 2023");
    });

    it("handles a different date format", () => {
      const date = "2023-12-31";
      const result = dateFormatting(date);

      expect(result).toEqual("December 31, 2023");
    });

    it("handles a date in the future", () => {
      const date = "2054-11-02T13:18:32.993Z";
      const result = dateFormatting(date);

      expect(result).toEqual("November 02, 2054");
    });

    it("handles an invalid date string", () => {
      const date = "invalid-date";
      const result = dateFormatting(date);

      expect(result).toEqual("");
    });
  });
});
