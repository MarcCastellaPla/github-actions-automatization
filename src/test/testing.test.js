import { describe, test, expect } from "vitest";
import {
  sumNumbers,
  subtractNumbers,
  multiplyNumbers,
  divideNumbers,
} from "./mathUtils";

describe("Math utils", () => {
  test("sumNumbers adds numbers correctly", () => {
    expect(sumNumbers(2, 3)).toBe(5);
  });

  test("subtractNumbers subtracts numbers correctly", () => {
    expect(subtractNumbers(5, 2)).toBe(3);
  });

  test("multiplyNumbers multiplies numbers correctly", () => {
    expect(multiplyNumbers(4, 3)).toBe(12);
  });

  test("divideNumbers divides numbers correctly", () => {
    expect(divideNumbers(10, 2)).toBe(5);
  });
});
