import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** `409-242-1559` → `+14092421559` for tel: links */
export function telHref(phone: string) {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}
