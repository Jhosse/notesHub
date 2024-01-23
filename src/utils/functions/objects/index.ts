import { NestedObject } from "../../../@types/custom/utils";

const sortKeys = (obj: NestedObject): NestedObject => {
  const sortedObj: NestedObject = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sortedObj[key] = sortKeys(obj[key]);
    });

  return sortedObj;
};

export { sortKeys };
