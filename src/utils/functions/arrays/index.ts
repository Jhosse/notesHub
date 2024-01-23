import { NestedObject } from "../../../@types/custom/utils";

export const createNestedObjFromArrOfStrArr = (
  arrOfStrArr: string[][]
): NestedObject => {
  const nestedObj: NestedObject = arrOfStrArr.reduce((acc, arr) => {
    let current: NestedObject = acc;

    for (const key of arr) {
      current = (current[key] = current[key] || {}) as NestedObject;
    }

    return acc;
  }, {});

  return nestedObj;
};

export const removeDuplicatedInArrOfStr: (arr: string[]) => string[] = (
  arr
) => [...new Set(arr)];

export const splitArrOfStrByDash: (arr: string[]) => string[][] = (arr) => {
  return arr.map((i) => i.split("-").map((i) => i.trim()));
};
