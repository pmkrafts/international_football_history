import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getResultColor(result: string) {
  switch (result) {
    case "win":
      return "text-win-green";
    case "loss":
      return "text-loss-red";
    case "draw":
      return "text-draw-gold";
    default:
      return "text-muted";
  }
}
