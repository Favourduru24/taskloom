import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvatar(userPicture: string | null, userEmail: string) {
    return userPicture ?? `https:avatar.vercel.sh/${userEmail}`
}