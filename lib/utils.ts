import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const MAX_FREE_FORM:number=3;

const isDev=process.env.NODE_ENV==="development";

export const ORIGIN_URL=isDev?"http://localhost:3000":"https://formify-rajal.vercel.app";
