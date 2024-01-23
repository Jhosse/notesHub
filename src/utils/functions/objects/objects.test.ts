import { NestedObject } from "../../../@types/custom/utils";
import { sortKeys } from ".";

const TAGS_OBJ_MOCK: NestedObject = {
  js: {
    code: {},
    interview: {},
    book: {
      btest: {},
      atest: {},
    },
  },
  frontend: { courses: {}, article: {} },
  react: { course: {}, article: {}, interview: {}, code: {} },
};

describe("sortKeys", () => {
  it("sort keys alphabetically for a nested object", () => {
    const sortedObject: NestedObject = sortKeys(TAGS_OBJ_MOCK);

    expect(Object.keys(sortedObject)).toEqual(["frontend", "js", "react"]);
    expect(Object.keys(sortedObject.js)).toEqual(["book", "code", "interview"]);
    expect(Object.keys(sortedObject.js.book)).toEqual(["atest", "btest"]);
  });

  it("handle an empty object", () => {
    const inputObject: NestedObject = {};

    const sortedObject: NestedObject = sortKeys(inputObject);
    expect(sortedObject).toEqual({});
  });

  it("handle a flat object", () => {
    const inputObject: NestedObject = {
      frontend: {},
      js: {},
      react: {},
    };

    const sortedObject: NestedObject = sortKeys(inputObject);

    expect(Object.keys(sortedObject)).toEqual(["frontend", "js", "react"]);
  });
});
