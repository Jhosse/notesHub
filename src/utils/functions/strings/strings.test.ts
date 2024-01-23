import { splitCamelCase, stringCapitalization, truncateText } from ".";
import { DESCRIPTION_MOCK } from "../../../mocks";

describe("strings", () => {
  describe("splitCamelCase", () => {
    it("splits camelCase strings with a space", () => {
      const input = "helloWorld";
      const result = splitCamelCase(input);

      expect(result).toEqual("hello World");
    });

    it("handles strings with consecutive uppercase letters", () => {
      const input = "thisIsAURL";
      const result = splitCamelCase(input);

      expect(result).toEqual("this Is AURL");
    });

    it("handles strings with leading uppercase letters", () => {
      const input = "AnotherTest";
      const result = splitCamelCase(input);

      expect(result).toEqual("Another Test");
    });

    it("handles strings with only uppercase letters", () => {
      const input = "ALLUPPERCASE";
      const result = splitCamelCase(input);

      expect(result).toEqual("ALLUPPERCASE");
    });

    it("handles an empty string", () => {
      const input = "";
      const result = splitCamelCase(input);

      expect(result).toEqual("");
    });
  });

  describe("stringCapitalization", () => {
    it("capitalizes the first letter of a lowercase string", () => {
      const input = "hello";
      const result = stringCapitalization(input);

      expect(result).toEqual("Hello");
    });

    it("does not change an already capitalized string", () => {
      const input = "World";
      const result = stringCapitalization(input);

      expect(result).toEqual("World");
    });

    it("handles an empty string", () => {
      const input = "";
      const result = stringCapitalization(input);

      expect(result).toEqual("");
    });

    it("handles a string with leading spaces", () => {
      const input = "   leading spaces";
      const result = stringCapitalization(input);

      expect(result).toEqual("Leading spaces");
    });

    it("handles a string with uppercase letters in the middle", () => {
      const input = "miXedCaSe";
      const result = stringCapitalization(input);

      expect(result).toEqual("MiXedCaSe");
    });
  });

  describe("truncateText", () => {
    it("truncates long text with spaces", () => {
      const result = truncateText("This is a long text with spaces", 10);
      expect(result).toBe("This is a...");
    });

    it("uses default maxLength if not provided", () => {
      const result = truncateText(DESCRIPTION_MOCK).trim();
      const expected =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis tincidunt facilisis. Etiam non massa ut purus ultrices ultrices id vel erat. Donec dolor risus, malesuada eget ligula et, porta finibus mi. Praesent hendrerit egestas nunc eu viverra. Nulla facilisi. Fusce malesuada eleifend...".trim();

      expect(result).toEqual(expected);
    });

    it("adds ellipsis to truncated text", () => {
      const result = truncateText(DESCRIPTION_MOCK).trim();
      expect(result.substring(result.length - 3, result.length)).toEqual("...");
    });

    it("truncates long text without spaces", () => {
      const result = truncateText("ThisIsALongTextWithoutSpaces", 10);
      expect(result).toBe("ThisIsALon...");
    });

    it("does not truncate or add ellipsis to short text", () => {
      const result = truncateText("Short text", 50);
      expect(result).toBe("Short text");
    });

    it("handles maxLength greater than text length", () => {
      const result = truncateText("Short text", 100);
      expect(result).toBe("Short text");
    });

    it("handles empty string", () => {
      const result = truncateText("", 50);
      expect(result).toBe("");
    });
  });
});
