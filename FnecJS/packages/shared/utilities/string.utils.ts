import { ObjectUtils } from "./object.utils";

export class StringUtils {
  static isNullOrUndefinedOrEmpty(str: string) {
    return ObjectUtils.isNullOrUndefined(str) || str.length === 0;
  }
  
}