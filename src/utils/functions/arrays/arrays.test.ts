import {
  createNestedObjFromArrOfStrArr,
  removeDuplicatedInArrOfStr,
  splitArrOfStrByDash,
} from ".";
import { NestedObject } from "../../../@types/custom/utils";

describe("arrays", () => {
  describe("createNestedObjFromArrOfStrArr", () => {
    it("creates a nested object from an array of string arrays", () => {
      const arrOfStrArr: string[][] = [
        ["a", "b", "c"],
        ["x", "y", "z"],
      ];
      const result: NestedObject = createNestedObjFromArrOfStrArr(arrOfStrArr);

      const expected: NestedObject = {
        a: {
          b: {
            c: {},
          },
        },
        x: {
          y: {
            z: {},
          },
        },
      };

      expect(result).toEqual(expected);
    });

    it("handles an empty array", () => {
      const arrOfStrArr: string[][] = [];
      const result: NestedObject = createNestedObjFromArrOfStrArr(arrOfStrArr);

      expect(result).toEqual({});
    });

    it("handles an array with a single empty string", () => {
      const arrOfStrArr: string[][] = [[""]];
      const result: NestedObject = createNestedObjFromArrOfStrArr(arrOfStrArr);

      expect(result).toEqual({ "": {} });
    });

    it("handles an array with multiple empty strings", () => {
      const arrOfStrArr: string[][] = [[""], [""], [""]];
      const result: NestedObject = createNestedObjFromArrOfStrArr(arrOfStrArr);

      expect(result).toEqual({ "": {} });
    });
  });

  describe("removeDuplicatedInArrOfStr", () => {
    it("removes duplicate strings from an array", () => {
      const arr = ["test1", "test2", "test1", "test2", "test3"];
      const result = removeDuplicatedInArrOfStr(arr);

      expect(result).toEqual(["test1", "test2", "test3"]);
    });

    it("handles an empty array", () => {
      const arr: string[] = [];
      const result = removeDuplicatedInArrOfStr(arr);

      expect(result).toEqual([]);
    });

    it("handles an array with no duplicates", () => {
      const arr = ["test1", "test2", "test3"];
      const result = removeDuplicatedInArrOfStr(arr);

      expect(result).toEqual(["test1", "test2", "test3"]);
    });

    it("handles an array with a single item", () => {
      const arr = ["test1"];
      const result = removeDuplicatedInArrOfStr(arr);

      expect(result).toEqual(["test1"]);
    });
  });

  describe("splitArrOfStrByDash", () => {
    it("splits strings in an array by dashes and trims whitespace", () => {
      const arr = ["test1 - test2", "test3 - test4", "test5 - test6"];
      const result = splitArrOfStrByDash(arr);

      expect(result).toEqual([
        ["test1", "test2"],
        ["test3", "test4"],
        ["test5", "test6"],
      ]);
    });

    it("handles an empty array", () => {
      const arr: string[] = [];
      const result = splitArrOfStrByDash(arr);

      expect(result).toEqual([]);
    });

    it("handles an array with strings without dashes", () => {
      const arr = ["test1", "test2", "test3"];
      const result = splitArrOfStrByDash(arr);

      expect(result).toEqual([["test1"], ["test2"], ["test3"]]);
    });

    it("handles an array with strings containing only whitespace", () => {
      const arr = [" ", "  ", "   "];
      const result = splitArrOfStrByDash(arr);

      expect(result).toEqual([[""], [""], [""]]);
    });
  });
});
