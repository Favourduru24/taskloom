import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvatar(userPicture: string | null, userEmail: string) {
  return userPicture ?? `https://avatar.vercel.sh/${userEmail}`;
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return 'No date';

  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) return 'Invalid date';

  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}