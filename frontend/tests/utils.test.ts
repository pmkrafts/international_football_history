import { describe, it, expect } from "vitest";
import { formatDate, getResultColor, cn } from "../src/lib/utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges classes correctly", () => {
      expect(cn("foo", "bar")).toBe("foo bar");
    });
  });

  describe("formatDate", () => {
    it("formats date string correctly", () => {
      const result = formatDate("2024-01-15");
      expect(result).toContain("2024");
    });
  });

  describe("getResultColor", () => {
    it("returns win color", () => {
      expect(getResultColor("win")).toBe("text-win-green");
    });

    it("returns loss color", () => {
      expect(getResultColor("loss")).toBe("text-loss-red");
    });

    it("returns draw color", () => {
      expect(getResultColor("draw")).toBe("text-draw-gold");
    });
  });
});
