import { NestedObject } from "../../../@types/custom/utils";
import {
  removeDuplicatedInArrOfStr,
  splitArrOfStrByDash,
  createNestedObjFromArrOfStrArr,
  sortKeys,
} from "../../../utils/functions";

const prepareTagsForNav = (tags: string[]): NestedObject => {
  const cleanArr: string[] = removeDuplicatedInArrOfStr(tags);
  const arrOfArrsFromTags: string[][] = splitArrOfStrByDash(cleanArr);
  const tagsObj: NestedObject =
    createNestedObjFromArrOfStrArr(arrOfArrsFromTags);
  const sortedObj: NestedObject = sortKeys(tagsObj);

  return sortedObj;
};

export { prepareTagsForNav };
