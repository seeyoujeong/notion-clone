import { describe, expect, test } from "vitest";
import joinWithSlash from "./joinWithSlash";

describe("joinWithSlash 함수 테스트", () => {
  test("문자열들을 슬래시로 연결한다.", () => {
    const result = joinWithSlash("hello", "world");

    expect(result).toBe("hello/world");
  });

  test("문자열과 숫자를 슬래시로 연결한다.", () => {
    const result = joinWithSlash("hello", 111);

    expect(result).toBe("hello/111");
  });

  test("숫자들을 슬래시로 연결한다.", () => {
    const result = joinWithSlash(111, 222, 333);

    expect(result).toBe("111/222/333");
  });

  test("각 인수의 앞뒤 슬래시를 제거한다.", () => {
    const result = joinWithSlash("/hello", "world/");

    expect(result).toBe("hello/world");
  });

  test("인수가 없을 때는 빈 문자열을 반환해야 한다", () => {
    const result = joinWithSlash();

    expect(result).toBe("");
  });
});
