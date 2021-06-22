const toString = Object.prototype.toString;
export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`;
}

export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";

export const isString = (val: unknown): val is string => {
  return is(val, "String");
};
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "Object");
};

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== "undefined";
}
