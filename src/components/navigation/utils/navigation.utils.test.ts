import { prepareTagsForNav } from ".";
import { NestedObject } from "../../../@types/custom/utils";

const ARGUMENT: string[] = [
  "css - codeResource",
  "css - linkResource - test1 - test5",
  "js - codeResource",
  "js - linkResource - test7",
];

const RESPONSE: NestedObject = {
  css: {
    codeResource: {},
    linkResource: {
      test1: {
        test5: {},
      },
    },
  },

  js: {
    codeResource: {},
    linkResource: {
      test7: {},
    },
  },
};

describe("Navigation Utils", () => {
  describe("prepareTagsForNav", () => {
    it("should render the nested object from string of tags", () => {
      const result = prepareTagsForNav(ARGUMENT);
      expect(result).toEqual(RESPONSE);
    });

    it("should return an empty obj if called with empty array", () => {
      const result = prepareTagsForNav([]);
      expect(result).toEqual({});
    });
  });
});
