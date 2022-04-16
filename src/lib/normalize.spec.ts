import { describe, it, expect } from "vitest"
import { normalize } from "./normalize"

describe("normalize", () => {
  it("packs root in array", () => {
    expect(normalize("hello")).toEqual([{ name: "hello" }])
  })

  it("packs array data in objects", () => {
    expect(normalize(["hello"])).toEqual([{ name: "hello" }])
  })

  it("packs string children recursively", () => {
    const data = { name: "hello", children: ["1", 2, "3"] }

    expect(normalize(data)).toEqual([
      {
        name: "hello",
        children: [{ name: "1" }, { name: "2" }, { name: "3" }],
      },
    ])
  })

  it("packs objects children recursively", () => {
    const data = {
      name: "hello",
      children: [{ name: "1", children: 4 }, 2, "3"],
    }

    expect(normalize(data)).toEqual([
      {
        name: "hello",
        children: [
          { name: "1", children: [{ name: "4" }] },
          { name: "2" },
          { name: "3" },
        ],
      },
    ])
  })
})
