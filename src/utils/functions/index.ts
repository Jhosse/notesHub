import { splitCamelCase, stringCapitalization, truncateText } from "./strings";
import {
  createNestedObjFromArrOfStrArr,
  removeDuplicatedInArrOfStr,
  splitArrOfStrByDash,
} from "./arrays";
import { dateFormatting } from "./dates";
import { debounce } from "./debounce";
import { getUrlMetadata } from "./metadata";
import { sortKeys } from "./objects";

export {
  createNestedObjFromArrOfStrArr,
  removeDuplicatedInArrOfStr,
  splitArrOfStrByDash,
  splitCamelCase,
  stringCapitalization,
  truncateText,
  dateFormatting,
  debounce,
  getUrlMetadata,
  sortKeys,
};
