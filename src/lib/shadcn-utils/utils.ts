import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// TODO: unit tests for this
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
